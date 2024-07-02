"use server";

import getBaseUrl from "@utils/getBaseUrl";

export default async function getCities(selectedState: string) {
  const serverUrl = getBaseUrl();

  try {
    const response = await fetch(
      `${serverUrl}/api/city/?state=${selectedState}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities :", error);
    throw error;
  }
}
