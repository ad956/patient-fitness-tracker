import getBaseUrl from "@utils/getBaseUrl";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function updatePersonal(filteredFields: any) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  try {
    const response = await fetch(`${serverUrl}/api/update-profile/personal`, {
      method: "PUT",
      headers,
      body: JSON.stringify(filteredFields),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error updating personal information:", error);
  }
}
