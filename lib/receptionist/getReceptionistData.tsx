"use server";

import getBaseUrl from "@utils/getBaseUrl";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function getReceptionistData() {
  const session = await getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
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
