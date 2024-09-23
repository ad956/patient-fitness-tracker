import fetchHandler from "@utils/fetchHandler";

export default async function getDiseases() {
  const endpoint = `/api/gethospitals/disease/`;

  try {
    const data = await fetchHandler(endpoint);

    return data;
  } catch (error) {
    console.error("Error fetching diseases:", error);
    throw error;
  }
}
