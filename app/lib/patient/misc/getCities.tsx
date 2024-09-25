import fetchHandler from "@utils/fetchHandler";

export default async function getCities(
  selectedState: string
): Promise<[string]> {
  const endpoint = `/api/city/?state=${selectedState}`;

  try {
    const response = await fetchHandler<[string]>(endpoint);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}
