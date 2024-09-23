import fetchHandler from "@utils/fetchHandler";
import { bookingAppointment } from "@pft-types/index";

export default async function bookAppointment(
  bookAppointmentData: bookingAppointment,
  transaction_id: string | null,
  appointment_charge: string
) {
  const endpoint = "/api/patient/appointment";

  try {
    const response = await fetchHandler(endpoint, {
      method: "POST",
      body: JSON.stringify({
        ...bookAppointmentData,
        transaction_id,
        appointment_charge,
      }),
    });

    if (!response) {
      console.error("Error booking appointments");
      return { error: "Failed to book appointment" };
    }

    return response;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}
