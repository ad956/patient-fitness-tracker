"use server";

import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function getUpcomingAppointments() {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  try {
    const res = await fetch(`${serverUrl}/api/patient/appointment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      // next: { revalidate: 10 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch upcoming appointments: ${res.statusText}`
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw error;
  }
}
