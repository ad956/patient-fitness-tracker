"use server";

import getBaseUrl from "@utils/getBaseUrl";

export default async function getDiseases() {
  const serverUrl = getBaseUrl();

  try {
    const response = await fetch(`${serverUrl}/api/gethospitals/disease/`);
    if (!response.ok) {
      throw new Error("Failed to fetch diseases");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching diseases :", error);
    throw error;
  }
}
