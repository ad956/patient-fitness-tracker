"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export default async function updatePersonal(
  filteredFields: any
): Promise<any> {
  const endpoint = "/api/update-profile/personal";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<any>(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify(filteredFields),
      },
      session!
    );

    if (response.error) return { error: response.error.message };

    return response.data!;
  } catch (error) {
    console.error("Error updating personal information:", error);
    throw error;
  }
}