"use server";

import getBaseUrl from "@utils/getBaseUrl";

export default async function scanQRCode(email: string) {
  const serverUrl = getBaseUrl();

  try {
    const res = await fetch(`${serverUrl}/api/receptionist/scan`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const message = await res.json();
    return message;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
