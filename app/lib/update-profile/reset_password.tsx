"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function resetPassword(
  currentPassword: string,
  newPassword: string
): Promise<any> {
  const endpoint = "/api/update-profile/reset-password";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<any>(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      },
      session!
    );

    if (response.error) return { error: response.error.message };

    return response.data!;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}
