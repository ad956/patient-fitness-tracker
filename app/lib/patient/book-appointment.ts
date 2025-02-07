"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function bookAppointment(
  bookAppointmentData: bookingAppointment,
  transaction_id: string | null,
  appointment_charge: string
): Promise<any> {
  const endpoint = "/api/patient/appointment";
  const session = getSessionToken();

  try {
    const response = await fetchHandler(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify({
          ...bookAppointmentData,
          transaction_id,
          appointment_charge,
        }),
      },
      session!
    );

    return response;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}
