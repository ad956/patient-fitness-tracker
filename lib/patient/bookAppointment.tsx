"use server";
import { bookingAppointment } from "@/types";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function bookAppointment(
  bookAppointmentData: bookingAppointment
) {
  const session = await getSessionToken();
  const serverUrl = process.env.BASE_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${serverUrl}/api/patient/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify(bookAppointmentData),
    });

    if (!response.ok) {
      console.error(`error booking appointments : ${response.statusText}`);
      const res = await response.json();
      throw new Error(`${res.error}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}
