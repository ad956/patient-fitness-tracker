export default async function getCities(
  selectedState: string
): Promise<[string]> {
  const endpoint = `/api/city/?state=${selectedState}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to fetch cities");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}
