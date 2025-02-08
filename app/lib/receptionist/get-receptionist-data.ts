export default async function getReceptionistData(): Promise<Receptionist> {
  const endpoint = "/api/receptionist";

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const result = await response.json();

    if (result.error) throw new Error(result.error.message);

    return result.data!;
  } catch (error) {
    console.error("Error fetching receptionist data:", error);
    throw error;
  }
}
