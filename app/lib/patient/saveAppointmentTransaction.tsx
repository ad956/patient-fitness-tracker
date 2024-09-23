import fetchHandler from "@utils/fetchHandler";

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

  const endpoint = "/api/transactions";

  try {
    await fetchHandler(endpoint, {
      method: "POST",
      body: JSON.stringify(transactionData),
    });
  } catch (error) {
    console.error("Error recording appointment transaction:", error);
  }
}
