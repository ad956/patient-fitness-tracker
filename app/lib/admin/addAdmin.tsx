"use server";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function addAdmin(formData: FormData) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/admin/add-admin`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(`Error fetching admin data: ${res.statusText}`);
      throw new Error("fetching admin data");
    }

    const result = await res.json();

    console.table(result);

    return result;
  } catch (error) {
    console.error("An error occurred while fetching admin data:", error);
    throw error;
  }
}
