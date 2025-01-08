"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";
import { DoctorChat } from "@pft-types/patient";

export default async function getDoctorsChatList(): Promise<DoctorChat[]> {
  const endpoint = "/api/patient/dashboard/doctors-chat-list";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<[DoctorChat]>(
      endpoint,
      {
        cache: "no-cache",
      },
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error(
      "An error occurred while fetching doctor's chat list for patient: ",
      error
    );
    throw error;
  }
}
