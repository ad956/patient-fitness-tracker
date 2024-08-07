"use server";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function getPatientData() {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/patient`, {
      headers,
      cache: "no-cache",
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
