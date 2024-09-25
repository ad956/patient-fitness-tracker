"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";
import { Receptionist } from "@pft-types/index";

export default async function getReceptionistData(): Promise<Receptionist> {
  const endpoint = "/api/receptionist";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<Receptionist>(
      endpoint,
      {
        cache: "no-cache",
      },
      session!
    );

    if (response.error) throw new Error(response.error.message);

    return response.data!;
  } catch (error) {
    console.error("Error fetching receptionist data:", error);
    throw error;
  }
}
