"use server";

import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function pendingAppointmentsRequest(hospital_id: string) {
  const session = await getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/patient/appointment/pending`, {
      method: "POST",
      body: JSON.stringify(hospital_id),
      headers,
    });

    if (!res.ok) {
      throw new Error(
        `fetching pending appointment request : ${res.statusText}`
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("An error occurred while :", error);
  }
}
