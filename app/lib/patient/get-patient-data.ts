export default async function getPatientData(): Promise<Patient> {
  const endpoint = "/api/patient";

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to fetch patient data");
    }

    return result.data!;
  } catch (error) {
    console.error("An error occurred while fetching patient data:", error);
    throw error;
  }
}
