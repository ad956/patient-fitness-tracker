"use server";
import { bookingAppointment } from "@types";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function bookAppointment(
  bookAppointmentData: bookingAppointment,
  transaction_id: string | null,
  appointment_charge: string
) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();
  try {
    const response = await fetch(`${serverUrl}/api/patient/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify({
        ...bookAppointmentData,
        transaction_id,
        appointment_charge,
      }),
    });

    if (!response.ok) {
      console.error(`Error booking appointments: ${response.statusText}`);
      const res = await response.json();
      return { error: res.error };
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}
