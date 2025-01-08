"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";
import { bookedAppointments } from "@pft-types/patient";

export default async function getUpcomingAppointments(): Promise<bookedAppointments> {
  const endpoint = "/api/patient/appointment";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<bookedAppointments>(
      endpoint,
      {},
      session!
    );
    // next: { revalidate: 10 },

    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data!;
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw error;
  }
}
