"use server";

import { getSessionToken } from "../sessions/sessionUtils";

export default async function approveAppointment(patientId: string) {
  const session = await getSessionToken();
  const serverUrl = process.env.BASE_URL || "http://localhost:3000";

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const response = await fetch(
      `${serverUrl}/api/receptionist/appointments/approve`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ patient_id: patientId }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to approve appointment: ${response.status} - ${response.statusText}`
      );
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error approving appointment:", error);
    throw error;
  }
}
