"use server";

import { getSessionToken } from "../sessions/sessionUtils";

export default async function getPendingAppointments() {
  try {
    const session = await getSessionToken();
    const serverUrl = process.env.BASE_URL || "http://localhost:3000";

    const headers = {
      Authorization: `Bearer ${session}`,
    };

    const res = await fetch(
      `${serverUrl}/api/receptionist/appointments/pending`,
      {
        headers,
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch pending appointments: ${res.status} - ${res.statusText}`
      );
    }

    const receptionistData = await res.json();

    return receptionistData;
  } catch (error) {
    console.error("Error fetching pending appointments:", error);
    throw error;
  }
}
