"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";
import { LabResult } from "@pft-types/patient";

export default async function getLabResults(): Promise<LabResult[]> {
  const endpoint = "/api/patient/dashboard/labresults";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<LabResult[]>(
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
      "An error occurred while fetching lab results for patient : ",
      error
    );
    throw error;
  }
}
