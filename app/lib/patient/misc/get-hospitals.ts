export default async function getHospitals(
  selectedState: string,
  selectedCity: string
): Promise<[BookAppointmentHospital]> {
  const endpoint = `/api/get-hospitals/?state=${selectedState}&city=${selectedCity}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to fetch hospitals");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
}
