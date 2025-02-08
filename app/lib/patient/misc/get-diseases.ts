export default async function getDiseases(): Promise<[string]> {
  const endpoint = `/api/get-hospitals/disease/`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to fetch diseases");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching diseases:", error);
    throw error;
  }
}
