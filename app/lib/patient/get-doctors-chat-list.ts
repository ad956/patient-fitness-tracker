export default async function getDoctorsChatList(): Promise<DoctorChat[]> {
  const endpoint = "/api/patient/dashboard/doctors-chat-list";

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error?.message || "Failed to fetch doctor's chat list"
      );
    }

    return result.data!;
  } catch (error) {
    console.error(
      "An error occurred while fetching doctor's chat list for patient: ",
      error
    );
    throw error;
  }
}
