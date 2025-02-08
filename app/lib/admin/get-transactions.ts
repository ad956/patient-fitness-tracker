"use server";

import { Admin, Hospital, Patient, Transaction } from "@models/index";
import { Types } from "mongoose";
import { dbConfig } from "@utils/index";
import authenticateUser from "../auth/authenticate-user";

export default async function getTransactions(): Promise<TransactionDetails[]> {
  try {
    const { id, role } = await authenticateUser();

    if (!id || !role) {
      throw new Error("Missing user ID or role in session");
    }

    await dbConfig();

    const admin_id = new Types.ObjectId(id);
    const adminData = await Admin.findById(admin_id);

    if (!adminData) {
      throw new Error("Admin not found");
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

    return transactionDetails;
  } catch (error: any) {
    console.error("An error occurred while fetching transactions data:", error);
    throw error;
  }
}
