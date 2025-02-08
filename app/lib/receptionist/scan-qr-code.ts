export default async function scanQRCode(
  email: string
): Promise<{ message: string }> {
  const endpoint = "/api/receptionist/scan";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    return result.data!;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
