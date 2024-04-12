"use server";
import { bookingAppointment } from "@/types";
import { getSessionToken } from "@sessions/sessionUtils";

export default async function bookAppointment(
  bookAppointmentData: bookingAppointment
) {
  const session = await getSessionToken();

  const response = await fetch(
    `http://localhost:3000/api/patient/appointment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify(bookAppointmentData),
    }
  );

  const res = await response.json();
  return res;
}
