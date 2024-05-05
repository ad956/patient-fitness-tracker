"use server";
import { bookingAppointment } from "@/types";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function bookAppointment(
  bookAppointmentData: bookingAppointment
) {
  try {
    const session = await getSessionToken();
    const serverUrl = process.env.BASE_URL || "http://localhost:3000";

    const response = await fetch(`${serverUrl}/api/patient/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify(bookAppointmentData),
    });

    if (!response.ok) {
      const error = new Error(`HTTP error ${response.status}`);
      throw error;
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}
