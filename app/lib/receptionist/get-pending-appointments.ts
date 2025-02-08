export default async function getPendingAppointments(): Promise<PendingPatients> {
  const endpoint = "/api/receptionist/appointments/pending";

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.error) throw new Error(result.error.message);

    return result.data!;
  } catch (error) {
    console.error("Error fetching pending appointments:", error);
    throw error;
  }
}
