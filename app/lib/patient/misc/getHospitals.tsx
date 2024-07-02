"use server";

import getBaseUrl from "@utils/getBaseUrl";

export default async function getHospitals(
  selectedState: string,
  selectedCity: string
) {
  const serverUrl = getBaseUrl();

  try {
    const response = await fetch(
      `${serverUrl}/api/gethospitals/?state=${selectedState}&city=${selectedCity}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch hospitals");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hospitals :", error);
    throw error;
  }
}
