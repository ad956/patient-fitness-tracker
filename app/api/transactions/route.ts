import dbConfig from "@utils/db";
import { Transaction as TransactionType } from "@pft-types/index";
import Transaction from "@models/transaction";
import { Types } from "mongoose";

// saving transaction details in db
export async function POST(req: Request) {
  const session = req.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

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
