import fetchHandler from "@utils/fetchHandler";

export default async function getReceptionistData() {
  const endpoint = "/api/receptionist";

  try {
    const receptionistData = await fetchHandler(endpoint, {
      cache: "no-cache",
    });

    return receptionistData;
  } catch (error) {
    console.error("Error fetching receptionist data:", error);
    throw error;
  }
}
