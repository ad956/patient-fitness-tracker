export default async function getHospitalData(): Promise<Hospital> {
  const endpoint = "/api/hospital";

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to fetch hospital data");
    }

    return result.data;
  } catch (error) {
    console.error("An error occurred while fetching hospital data:", error);
    throw error;
  }
}
