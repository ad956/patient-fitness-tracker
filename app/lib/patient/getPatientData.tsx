import fetchHandler from "@utils/fetchHandler";

export default async function getPatientData() {
  const endpoint = "/api/patient";

  try {
    const patientData = await fetchHandler(endpoint, {
      cache: "no-cache",
    });

    return patientData;
  } catch (error) {
    console.error("An error occurred while fetching patient data:", error);
    throw error;
  }
}
