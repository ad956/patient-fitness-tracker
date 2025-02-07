"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function getPendingAppointments(): Promise<PendingPatients> {
  const endpoint = "/api/receptionist/appointments/pending";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<PendingPatients>(
      endpoint,
      {},
      session!
    );

    if (response.error) throw new Error(response.error.message);

    return response.data!;
  } catch (error) {
    console.error("Error fetching pending appointments:", error);
    throw error;
  }
}
