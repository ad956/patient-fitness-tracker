import fetchHandler from "@utils/fetchHandler";

export default async function approveAppointment(patientId: string) {
  const endpoint = "/api/receptionist/appointments/approve";

  try {
    const result = await fetchHandler(endpoint, {
      method: "POST",
      body: JSON.stringify({ patient_id: patientId }),
    });

    return result;
  } catch (error) {
    console.error("Error approving appointment:", error);
    throw error;
  }
}
