export default async function getUpcomingAppointments() {
  const res = await fetch(
    `http://localhost:3000/api/patient/appointment?email=anandsuthar956@gmail.com`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) throw new Error("Fetching Single User failed");

  return res.json();
}
