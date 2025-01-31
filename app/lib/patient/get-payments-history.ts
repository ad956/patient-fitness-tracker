"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";
import { Payment } from "@pft-types/patient";

export default async function getPaymentsHistory(): Promise<[Payment]> {
  const endpoint = "/api/patient/payment-history";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<[Payment]>(endpoint, {}, session!);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}
