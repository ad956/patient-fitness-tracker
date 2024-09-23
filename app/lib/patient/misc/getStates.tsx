import fetchHandler from "@utils/fetchHandler";

export default async function getStates() {
  const endpoint = "/api/states";

  try {
    const data = await fetchHandler(endpoint);

    return data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
}
