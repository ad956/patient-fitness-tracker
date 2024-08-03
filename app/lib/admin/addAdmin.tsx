"use server";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function addAdmin(formData: FormData) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
    "Content-Type": "application/json",
  };

  try {
    const formDataObject = Object.fromEntries(formData.entries());

    const res = await fetch(`${serverUrl}/api/admin/add-admin`, {
      method: "POST",
      headers,
      body: JSON.stringify(formDataObject),
      cache: "no-cache",
    });

    const result = await res.json();

    if (!res.ok) {
      return { error: result.error || "An error occurred" };
    }

    return result;
  } catch (error) {
    console.error("An error occurred while adding admin:", error);
    return { error: "An unexpected error occurred" };
  }
}
