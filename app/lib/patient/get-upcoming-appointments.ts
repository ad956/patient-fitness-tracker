export default async function getUpcomingAppointments(): Promise<bookedAppointments> {
  const endpoint = "/api/patient/appointment";

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error?.message || "Failed to fetch upcoming appointments"
      );
    }

    return result.data!;
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw error;
  }
}
