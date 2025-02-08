export default async function savePendingBillTransaction(
  txnDocumentId: string | null,
  transaction_id: string | null,
  status: "Success" | "Failed"
): Promise<any> {
  const endpoint = "/api/transactions";

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        txnDocumentId,
        transaction_id,
        status,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error?.message || "Failed to update transaction status"
      );
    }

    return result;
  } catch (error) {
    console.error("Error updating transaction status: ", error);
    throw error;
  }
}
