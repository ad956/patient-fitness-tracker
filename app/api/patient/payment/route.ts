import { ObjectId } from "mongodb";
import dbConfig from "@/lib/db";
import { decrypt } from "@sessions/sessionUtils";

interface Transaction {
  _id: ObjectId;
  hospital: ObjectId;
}

interface Hospital {
  _id: ObjectId;
  firstname: string;
  lastname: string;
  profile: string;
}

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    const db = await dbConfig();
    const patientCollection = db.collection("patient");

    const patient = await patientCollection.findOne({ email });
    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    const transactionsCollection = db.collection<Transaction>("transactions"); // Specify Transaction type
    const transactionProjection = { _id: 0, transaction_id: 0, patient: 0 };
    const transactions = await transactionsCollection
      .find({ patient: patient._id })
      .toArray();

    const hospitalIds = transactions.map((transaction) => transaction.hospital);

    const hospitalCollection = db.collection<Hospital>("hospital"); // Specify Hospital type

    const hospitals = await hospitalCollection
      .find({ _id: { $in: hospitalIds } })
      .toArray();

    const hospitalMap: Record<string, Hospital> = {};

    hospitals.forEach((hospital) => {
      hospitalMap[hospital._id.toHexString()] = hospital;
    });

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      hospital: {
        name: `${hospitalMap[transaction.hospital.toHexString()].firstname} ${
          hospitalMap[transaction.hospital.toHexString()].lastname
        }`,
        profile: hospitalMap[transaction.hospital.toHexString()].profile,
      },
    }));

    return Response.json(formattedTransactions);
  } catch (error) {
    console.error("Error fetching payment data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
