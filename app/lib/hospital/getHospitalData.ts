import fetchHandler from "@utils/fetchHandler";

export default async function getHospitalData() {
  const endpoint = "/api/hospital";

  try {
    const hospitalData = await fetchHandler(endpoint, {
      cache: "no-cache",
    });

    return hospitalData;
  } catch (error) {
    console.error("An error occurred while fetching hospital data:", error);
    throw error;
  }
}
