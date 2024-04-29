"use server";

import { getSessionToken } from "../sessions/sessionUtils";

export default async function approveAppointment(patientId: string) {
  const session = await getSessionToken();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  const response = await fetch(
    "http://localhost:3000/api/receptionist/appointments/approve",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ patient_id: patientId }),
    }
  );

  const res = await response.json();

  return res;
}
