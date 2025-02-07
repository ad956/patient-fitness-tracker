"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function getDoctorData(): Promise<Doctor> {
  const endpoint = "/api/doctor";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<Promise<Doctor>>(
      endpoint,
      {
        cache: "no-cache",
      },
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("An error occurred while fetching doctor data:", error);
    throw error;
  }
}
