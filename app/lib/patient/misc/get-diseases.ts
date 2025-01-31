import fetchHandler from "@utils/fetch-handler";

export default async function getDiseases(): Promise<[string]> {
  const endpoint = `/api/get-hospitals/disease/`;

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
