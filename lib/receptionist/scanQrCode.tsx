"use server";

export default async function scanQRCode(email: string) {
  const serverUrl = process.env.BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${serverUrl}/api/receptionist/scan`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const msg = await res.json();
    return msg;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
