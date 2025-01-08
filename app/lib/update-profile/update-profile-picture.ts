"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

async function updateProfilePicture(profile_url: string): Promise<any> {
  const endpoint = "/api/update-profile/profile";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<any>(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify(profile_url),
      },
      session!
    );

    if (response.error) return { error: response.error.message };

    return response.data!;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error;
  }
}

export default updateProfilePicture;
