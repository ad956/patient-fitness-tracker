"use server";

import { getSessionToken } from "../sessions/sessionUtils";

export default async function getPayments() {
  const session = await getSessionToken();
  const serverUrl = process.env.BASE_URL || "http://localhost:3000";

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const response = await fetch(`${serverUrl}/api/patient/payment`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch payments: ${response.statusText}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}
