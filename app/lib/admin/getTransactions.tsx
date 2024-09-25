"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";
import { TransactionDetails } from "@pft-types/admin";

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
