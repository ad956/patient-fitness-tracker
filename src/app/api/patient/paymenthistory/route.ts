import { ObjectId } from "mongodb";
import dbConfig from "@/app/lib/db";
import { decrypt } from "@/app/lib/sessions/sessionUtils";

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

    // get all transactions where patient id matches
    const transactionsCollection = db.collection<Transaction>("transactions");
    const transactions = await transactionsCollection
      .find({ patient: patient._id })
      .toArray();

    // get hospital id's from transactions
    const hospitalIds = transactions.map((transaction) => transaction.hospital);

    const hospitalCollection = db.collection<Hospital>("hospital");

    // hospitals whos id is in transactions
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
