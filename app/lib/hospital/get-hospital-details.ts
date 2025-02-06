"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function getHospitalDetails(): Promise<HospitalDetailsType> {
  const endpoint = "/api/hospital/additional-details";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<HospitalDetailsType>(
      endpoint,
      {},
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error(
      "An error occurred while fetching hospital additional details:",
      error
    );
    throw error;
  }
}
