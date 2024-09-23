import fetchHandler from "@utils/fetchHandler";

export default async function getPendingAppointments() {
  const endpoint = "/api/receptionist/appointments/pending";

  try {
    const receptionistData = await fetchHandler(endpoint, {});

    return receptionistData;
  } catch (error) {
    console.error("Error fetching pending appointments:", error);
    throw error;
  }
}
