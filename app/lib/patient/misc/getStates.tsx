import fetchHandler from "@utils/fetchHandler";

export default async function getStates(): Promise<[string]> {
  const endpoint = "/api/states";

  try {
    const response = await fetchHandler<[string]>(endpoint);

    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data!;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
}
