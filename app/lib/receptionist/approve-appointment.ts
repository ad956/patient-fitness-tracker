"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function approveAppointment(
  patientId: string
): Promise<any> {
  const endpoint = "/api/receptionist/appointments/approve";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<any>(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify({ patient_id: patientId }),
      },
      session!
    );

    if (response.error) throw new Error(response.error.message);

    return response.data!;
  } catch (error) {
    console.error("Error approving appointment:", error);
    throw error;
  }
}
