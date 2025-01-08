"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function savePendingBillTransaction(
  txnDocumentId: string | null,
  transaction_id: string | null,
  status: "Success" | "Failed"
): Promise<any> {
  const endpoint = "/api/transactions";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<any>(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify({
          txnDocumentId,
          transaction_id,
          status,
        }),
      },
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  } catch (error) {
    console.error("Error updating transaction status: ", error);
    throw error;
  }
}
