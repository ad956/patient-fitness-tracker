export default async function getPatientMedicalHistory(): Promise<
  [MedicalHistory]
> {
  const endpoint = "/api/patient/medical-history";

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
        result.error?.message || "Failed to fetch medical history"
      );
    }

    return result.data!;
  } catch (error) {
    console.error("Error fetching patient medical history:", error);
    throw error;
  }
}
