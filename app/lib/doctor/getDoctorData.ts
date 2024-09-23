import fetchHandler from "@utils/fetchHandler";

export default async function getDoctorData() {
  const endpoint = "/api/doctor";

  try {
    const doctorData = await fetchHandler(endpoint, {
      cache: "no-cache",
    });

    return doctorData;
  } catch (error) {
    console.error("An error occurred while fetching doctor data:", error);
    throw error;
  }
}
