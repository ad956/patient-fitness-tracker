import fetchHandler from "@utils/fetchHandler";

export default async function getCities(selectedState: string) {
  const endpoint = `/api/city/?state=${selectedState}`;

  try {
    const data = await fetchHandler(endpoint);

    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}
