import dbConfig from "@utils/db";
import { Transaction as TransactionType } from "@pft-types/index";
import Transaction from "@models/transaction";
import { Types } from "mongoose";

// saving transaction details in db
export async function POST(req: Request) {
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

    const id = req.headers.get("x-user-id");
    const role = req.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
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

    if (!res)
      return Response.json({
        error: "Error saving transaction details",
      });

    return Response.json({ status: 200 });
  } catch (error) {
    console.error("Error saving transaction :", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
