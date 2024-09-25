"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";
import { Hospital } from "@pft-types/index";

export default async function getHospitalData(): Promise<Hospital> {
  const endpoint = "/api/hospital";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<Hospital>(
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
    console.error("An error occurred while fetching hospital data:", error);
    throw error;
  }
}
