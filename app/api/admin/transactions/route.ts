import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import { Admin, Hospital, Patient, Transaction } from "@models/index";
import { TransactionDetails } from "@types";

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    await dbConfig();

    const adminData = await Admin.findOne({ email });

    if (!adminData) {
      return Response.json({ error: "Admin not found" }, { status: 404 });
    }

    const transactions = await Transaction.find({}).sort({ createdAt: -1 });

    const transactionDetails: TransactionDetails[] = await Promise.all(
      transactions.map(async (transaction) => {
        const patient = await Patient.findById(transaction.patient);
        const hospital = await Hospital.findById(transaction.hospital);

        return {
          transaction_id: transaction.transaction_id,
          patient: {
            name: `${patient?.firstname} ${patient?.lastname}` || "",
            profile: patient?.profile || "",
          },

          hospital: {
            name: `${hospital?.firstname} ${hospital?.lastname}` || "",
            profile: hospital?.profile || "",
          },
          disease: transaction.disease,
          description: transaction.description,
          amount: transaction.amount,
          status: transaction.status,
          date: transaction.createdAt.toISOString(),
        };
      })
    );

    return Response.json(transactionDetails);
  } catch (error) {
    console.error("Error fetching Transaction data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
