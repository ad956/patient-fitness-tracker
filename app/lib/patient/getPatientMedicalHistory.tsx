"use server";

import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function getPatientMedicalHistory() {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const response = await fetch(`${serverUrl}/api/patient/medicalhistory`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch patient medical history: ${response.statusText}`
      );
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching patient medical history:", error);
    throw error;
  }
}
