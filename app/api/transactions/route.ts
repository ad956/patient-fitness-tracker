import dbConfig from "@/app/utils/db";
import { Transaction } from "@/types";
import { ObjectId } from "mongodb";

// saving transaction details in db
export async function POST(req: Request) {
  const session = req.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      transaction_id,
      timestamp,
      patient_id,
      hospital_id,
      disease,
      description,
      amount,
      status,
    }: Transaction = await req.json();

    const db = await dbConfig();
    const transaction_collection = db.collection("transactions");

    const transactionData = {
      transaction_id,
      timestamp,
      patient: new ObjectId(patient_id),
      hospital: new ObjectId(hospital_id),
      disease,
      description,
      amount,
      status,
    };

    const res = await transaction_collection.insertOne(transactionData);

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
