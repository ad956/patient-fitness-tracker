"use server";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function getAdminData() {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/admin`, {
      headers,
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(`Error fetching admin data: ${res.statusText}`);
      throw new Error("fetching admin data");
    }

    const adminData = await res.json();

    return adminData;
  } catch (error) {
    console.error("An error occurred while fetching admin data:", error);
    throw error;
  }
}
