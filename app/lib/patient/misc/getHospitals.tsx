import fetchHandler from "@utils/fetchHandler";

export default async function getHospitals(
  selectedState: string,
  selectedCity: string
) {
  const endpoint = `/api/gethospitals/?state=${selectedState}&city=${selectedCity}`;

  try {
    const data = await fetchHandler(endpoint);

    return data;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
}
