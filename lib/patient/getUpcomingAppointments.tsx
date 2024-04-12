import { getSessionToken } from "@sessions/sessionUtils";

export default async function getUpcomingAppointments() {
  const session = await getSessionToken();

  const res = await fetch(`http://localhost:3000/api/patient/appointment`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) throw new Error("Fetching upcoming appointments failed");

  return res.json();
}
