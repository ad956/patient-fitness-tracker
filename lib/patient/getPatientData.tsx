"use server";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function getPatientData() {
  try {
    const session = await getSessionToken();
    const serverUrl = process.env.BASE_URL || "http://localhost:3000";

    const headers = {
      Authorization: `Bearer ${session}`,
    };

    const res = await fetch(`${serverUrl}/api/patient`, {
      headers,
      next: { revalidate: 10 },
      // cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Error fetching patient data: ${res.statusText}`);
      throw new Error("fetching patient data");
    }

    const patientData = await res.json();
    return patientData;
  } catch (error) {
    console.error("An error occurred while fetching patient data:", error);
    throw error;
  }
}
