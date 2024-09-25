import { NextResponse } from "next/server";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { Transaction as TransactionType } from "@pft-types/index";
import Transaction from "@models/transaction";
import { Types } from "mongoose";
import authenticateUser from "@lib/auth/authenticateUser";

// saving transaction details in db
export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");
  try {
    const {
      transaction_id,
      patient_id,
      hospital_id,
      disease,
      description,
      amount,
      status,
    }: TransactionType = await req.json();

    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    await dbConfig();

    const transactionData = {
      transaction_id,
      patient: new Types.ObjectId(patient_id),
      hospital: new Types.ObjectId(hospital_id),
      disease,
      description,
      amount,
      status,
    };

    const res = await Transaction.create(transactionData);

    if (!res) {
      return errorHandler(
        "Error saving transaction details",
        STATUS_CODES.SERVER_ERROR
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error("Error saving transaction:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
