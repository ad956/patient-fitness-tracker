"use server";

import getBaseUrl from "@utils/getBaseUrl";

export default async function getStates() {
  const serverUrl = getBaseUrl();

  try {
    const response = await fetch(`${serverUrl}/api/states`);
    if (!response.ok) {
      throw new Error("Failed to fetch states");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching states :", error);
    throw error;
  }
}
