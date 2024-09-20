import dbConfig from "@utils/db";
import { Admin, Hospital, Patient, Transaction } from "@models/index";
import { TransactionDetails } from "@pft-types/index";
import { Types } from "mongoose";

export async function GET(request: Request) {
  try {
    const id = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    await dbConfig();

    const admin_id = new Types.ObjectId(id);
    const adminData = await Admin.findById(admin_id);

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
