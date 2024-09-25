"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";
import { MedicalHistory } from "@pft-types/patient";

export default async function getPatientMedicalHistory(): Promise<
  [MedicalHistory]
> {
  const endpoint = "/api/patient/medicalhistory";
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
