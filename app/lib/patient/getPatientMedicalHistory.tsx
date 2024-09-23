import fetchHandler from "@utils/fetchHandler";

export default async function getPatientMedicalHistory() {
  const endpoint = "/api/patient/medicalhistory";

  try {
    const medicalHistory = await fetchHandler(endpoint);

    return medicalHistory;
  } catch (error) {
    console.error("Error fetching patient medical history:", error);
    throw error;
  }
}
