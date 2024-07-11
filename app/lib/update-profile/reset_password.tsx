import getBaseUrl from "@utils/getBaseUrl";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function resetPassword(
  currentPassword: string,
  newPassword: string
) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  try {
    const response = await fetch(
      `${serverUrl}/api/update-profile/reset-password`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ currentPassword, newPassword }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error updating password :", error);
  }
}
