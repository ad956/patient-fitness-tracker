"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function pendingAppointmentsRequest(
  hospital_id: string
): Promise<{ hasPendingAppointment: boolean }> {
  const endpoint = "/api/patient/appointment/pending";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<{ hasPendingAppointment: boolean }>(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify({ hospital_id }),
      },
      session!
    );

    return response.data!;
  } catch (error) {
    console.error(
      "An error occurred while fetching pending appointment requests:",
      error
    );
    throw error;
  }
}
