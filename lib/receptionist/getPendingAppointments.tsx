import { getSessionToken } from "@sessions/sessionUtils";

export async function getPendingAppointments() {
  const session = await getSessionToken();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  const res = await fetch(
    `http://localhost:3000/api/receptionist/appointments/pending`,
    {
      headers,
      //   next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    console.error(`Error fetching receptionist data: ${res.status}`);
    throw new Error("Failed to fetch receptionist data");
  }

  const receptionistData = await res.json();

  return receptionistData;
}
