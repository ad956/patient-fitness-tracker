"use server";

import { getSessionToken } from "../sessions/sessionUtils";

export default async function getPatientMedicalHistory() {
  try {
    const session = await getSessionToken();
    const serverUrl = process.env.BASE_URL || "http://localhost:3000";

    const headers = {
      Authorization: `Bearer ${session}`,
    };

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
