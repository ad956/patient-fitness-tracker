"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function saveAppointmentTransaction(
  transaction_id: string | null,
  patient_id: string,
  hospital_id: string,
  disease: string,
  description: string,
  amount: string,
  status: string
): Promise<any> {
  const transactionData = {
    transaction_id,
    patient_id,
    hospital_id,
    disease,
    description,
    amount,
    status,
  };

  const endpoint = "/api/transactions";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<any>(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(transactionData),
      },
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }
  } catch (error) {
    console.error("Error recording appointment transaction:", error);
    throw error;
  }
}
