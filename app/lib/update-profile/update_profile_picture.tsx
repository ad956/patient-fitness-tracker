import getBaseUrl from "@utils/getBaseUrl";
import { getSessionToken } from "../sessions/sessionUtils";

async function updateProfilePicture(profile_url: string) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/update-profile/profile`, {
      method: "PUT",
      headers,
      body: JSON.stringify(profile_url),
    });

    const isProfileUpdated = await res.json();

    return isProfileUpdated;
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
}

export default updateProfilePicture;
