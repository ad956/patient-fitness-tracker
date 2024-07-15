"use server";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function getHospitalData() {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/hospital`, {
      headers,
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(`Error fetching hospital data: ${res.statusText}`);
      throw new Error("fetching hospital data");
    }

    const hospitalData = await res.json();

    return hospitalData;
  } catch (error) {
    console.error("An error occurred while fetching hospital data:", error);
    throw error;
  }
}
