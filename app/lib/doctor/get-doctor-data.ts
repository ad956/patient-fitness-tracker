export default async function getDoctorData(): Promise<Doctor> {
  const endpoint = "/api/doctor";

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to fetch doctor data");
    }

    return result.data;
  } catch (error) {
    console.error("An error occurred while fetching doctor data:", error);
    throw error;
  }
}
