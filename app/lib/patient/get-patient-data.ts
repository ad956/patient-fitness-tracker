"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";
import { Patient } from "@syncure-types/index";

export default async function getresponse(): Promise<Patient> {
  const endpoint = "/api/patient";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<Patient>(
      endpoint,
      {
        cache: "no-cache",
        next: { tags: ["profile"] },
      },
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("An error occurred while fetching patient data:", error);
    throw error;
  }
}
