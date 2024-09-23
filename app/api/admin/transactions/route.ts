import dbConfig from "@utils/db";
import { Admin, Hospital, Patient, Transaction } from "@models/index";
import { TransactionDetails } from "@pft-types/index";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { errorHandler, STATUS_CODES } from "@utils/index";
import { authenticateUser } from "@lib/auth/authenticateUser";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler(
        "Missing user ID or role",
        STATUS_CODES.VALIDATION_ERROR
      );
    }

    await dbConfig();

    const admin_id = new Types.ObjectId(id);
    const adminData = await Admin.findById(admin_id);

    if (!adminData) {
      return errorHandler("Admin not found", STATUS_CODES.NOT_FOUND);
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

    return NextResponse.json(transactionDetails, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Transaction data:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
