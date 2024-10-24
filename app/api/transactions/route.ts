import { NextResponse } from "next/server";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { Transaction as TransactionType } from "@pft-types/index";
import Transaction from "@models/transaction";
import { Types } from "mongoose";
import authenticateUser from "@lib/auth/authenticateUser";

interface pendingTransactionReqBody {
  txnDocumentId: string;
  transaction_id: string;
  status: string;
}

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

// save pending transaction
export async function PUT(req: Request) {
  const authHeader = req.headers.get("Authorization");

  try {
    const { txnDocumentId, transaction_id, status }: pendingTransactionReqBody =
      await req.json();

    if (!txnDocumentId || !transaction_id || !status) {
      return errorHandler(
        "TxnDocumentId, Transaction ID and status are required",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    await dbConfig();

    if (status === "Success") {
      // find and update the transaction if status is "Success"
      const updatedTransaction = await Transaction.findOneAndUpdate(
        {
          _id: new Types.ObjectId(txnDocumentId),
          status: "Pending",
        },
        { transaction_id: transaction_id, status: status },
        { new: true }
      );

      if (!updatedTransaction) {
        return errorHandler(
          "Failed to update transaction details",
          STATUS_CODES.NOT_FOUND
        );
      }

      return NextResponse.json({ status: 200 });
    } else if (status === "Failed") {
      // find the existing pending transaction
      const existingTransaction = await Transaction.findOne({
        _id: new Types.ObjectId(txnDocumentId),
        status: "Pending",
      });

      if (!existingTransaction) {
        return errorHandler(
          "No pending transaction found",
          STATUS_CODES.NOT_FOUND
        );
      }

      // new transaction based on the existing one
      const newTransaction = new Transaction({
        ...existingTransaction.toObject(),
        transaction_id: transaction_id,
        status: "Failed",
      });

      await newTransaction.save();

      return NextResponse.json({
        status: 201,
      });
    } else {
      return errorHandler("Invalid status value", STATUS_CODES.BAD_REQUEST);
    }
  } catch (error: any) {
    console.error("Error updating transaction:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
