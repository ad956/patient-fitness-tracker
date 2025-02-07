"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function getPendingBills(): Promise<[PendingBill]> {
  const endpoint = "/api/patient/payment-history?status=pending";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<[PendingBill]>(
      endpoint,
      {
        cache: "no-cache",
      },
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error(
      "An error occurred while fetching pending bills of patient : ",
      error
    );
    throw error;
  }
}
