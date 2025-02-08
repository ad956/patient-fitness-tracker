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

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to record transaction");
    }
  } catch (error) {
    console.error("Error recording appointment transaction:", error);
    throw error;
  }
}
