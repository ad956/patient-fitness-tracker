import getBaseUrl from "@utils/getBaseUrl";
import { getSessionToken } from "../sessions/sessionUtils";

export default async function updateAddress(filteredFields: any) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  try {
    const response = await fetch(`${serverUrl}/api/update-profile/address`, {
      method: "PUT",
      headers,
      body: JSON.stringify(filteredFields),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error updating address information:", error);
  }
}
