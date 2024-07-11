import getBaseUrl from "@utils/getBaseUrl";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function updateSecurity(password: string) {
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
        body: JSON.stringify({ password }),
      }
    );

    const success = await response.json();

    return success;
  } catch (error) {
    console.error("Error updating password :", error);
  }
}
