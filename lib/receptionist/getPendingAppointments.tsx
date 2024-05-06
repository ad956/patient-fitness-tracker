"use server";

import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function getPendingAppointments() {
  const session = await getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
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
