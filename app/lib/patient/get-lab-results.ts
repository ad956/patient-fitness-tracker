export default async function getLabResults(): Promise<LabResult[]> {
  const endpoint = "/api/patient/dashboard/labresults";

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to fetch lab results");
    }

    return result.data!;
  } catch (error) {
    console.error(
      "An error occurred while fetching lab results for patient : ",
      error
    );
    throw error;
  }
}
