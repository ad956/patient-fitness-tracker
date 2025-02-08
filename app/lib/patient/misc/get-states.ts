export default async function getStates(): Promise<[string]> {
  const endpoint = "/api/states";

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to fetch states");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
}
