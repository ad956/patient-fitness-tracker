"use server";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function getDoctorData() {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/doctor`, {
      headers,
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(`Error fetching doctor data: ${res.statusText}`);
      throw new Error("fetching doctor data");
    }

    const doctorData = await res.json();

    return doctorData;
  } catch (error) {
    console.error("An error occurred while fetching doctor data:", error);
    throw error;
  }
}
