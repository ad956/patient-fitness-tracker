"use server";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function saveAppointmentTransaction(
  transaction_id: string | null,
  patient_id: string,
  hospital_id: string,
  disease: string,
  description: string,
  amount: string,
  status: string
) {
  const transactionData = {
    transaction_id,
    patient_id,
    hospital_id,
    disease,
    description,
    amount,
    status,
  };

  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  try {
    await fetch(`${serverUrl}/api/transactions`, {
      method: "POST",
      body: JSON.stringify(transactionData),
      headers,
    });
  } catch (error) {
    console.error("Error recording appointment transaction :", error);
  }
}
