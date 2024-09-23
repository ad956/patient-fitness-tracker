"use server";
import fetchHandler from "@utils/fetchHandler";

export default async function getUpcomingAppointments() {
  const endpoint = "/api/patient/appointment";

  try {
    const upcomingAppointments = await fetchHandler(endpoint);
    // next: { revalidate: 10 },

    return upcomingAppointments;
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw error;
  }
}
