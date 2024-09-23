import fetchHandler from "@utils/fetchHandler";

export default async function pendingAppointmentsRequest(hospital_id: string) {
  const endpoint = "/api/patient/appointment/pending";

  try {
    const data = await fetchHandler(endpoint, {
      method: "POST",
      body: JSON.stringify({ hospital_id }),
    });

    return data;
  } catch (error) {
    console.error(
      "An error occurred while fetching pending appointment requests:",
      error
    );
    throw error;
  }
}
