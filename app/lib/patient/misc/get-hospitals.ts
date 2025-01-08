import { BookAppointmentHospital } from "@pft-types/patient";
import fetchHandler from "@utils/fetch-handler";

export default async function getHospitals(
  selectedState: string,
  selectedCity: string
): Promise<[BookAppointmentHospital]> {
  const endpoint = `/api/gethospitals/?state=${selectedState}&city=${selectedCity}`;

  try {
    const response = await fetchHandler<[BookAppointmentHospital]>(endpoint);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
}
