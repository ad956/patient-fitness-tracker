"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";
import { Payment } from "@pft-types/patient";

export default async function getPaymentsHistory(): Promise<[Payment]> {
  const endpoint = "/api/patient/paymenthistory";
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
