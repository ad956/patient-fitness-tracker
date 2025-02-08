export default async function approveAppointment(
  patientId: string
): Promise<any> {
  const endpoint = "/api/receptionist/appointments/approve";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patient_id: patientId }),
    });

    const result = await response.json();

    if (result.error) throw new Error(result.error.message);

    return result.data!;
  } catch (error) {
    console.error("Error approving appointment:", error);
    throw error;
  }
}
