"use server";

import { getSessionToken } from "../sessions/sessionUtils";

export default async function getReceptionistData() {
  try {
    const session = await getSessionToken();
    const serverUrl = process.env.BASE_URL || "http://localhost:3000";

    const headers = {
      Authorization: `Bearer ${session}`,
    };

    const res = await fetch(`${serverUrl}/api/receptionist`, {
      headers,
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch receptionist data: ${res.status} - ${res.statusText}`
      );
    }

    const receptionistData = await res.json();

    return receptionistData;
  } catch (error) {
    console.error("Error fetching receptionist data:", error);
    throw error;
  }
}
