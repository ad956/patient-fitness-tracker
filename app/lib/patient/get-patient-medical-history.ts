"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function getPatientMedicalHistory(): Promise<
  [MedicalHistory]
> {
  const endpoint = "/api/patient/medical-history";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<[MedicalHistory]>(
      endpoint,
      {},
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("Error fetching patient medical history:", error);
    throw error;
  }
}
