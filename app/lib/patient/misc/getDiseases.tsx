import fetchHandler from "@utils/fetchHandler";

export default async function getDiseases(): Promise<[string]> {
  const endpoint = `/api/gethospitals/disease/`;

  try {
    const response = await fetchHandler<[string]>(endpoint);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("Error fetching diseases:", error);
    throw error;
  }
}
