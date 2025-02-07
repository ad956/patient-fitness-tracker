"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function getTransactions(): Promise<[TransactionDetails]> {
  const endpoint = "/api/admin/transactions";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<[TransactionDetails]>(
      endpoint,
      {},
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("An error occurred while fetching transactions data:", error);
    throw error;
  }
}
