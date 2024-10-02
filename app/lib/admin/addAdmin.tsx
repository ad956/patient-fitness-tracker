"use server";

import { getSessionToken } from "../sessions/sessionUtils";
import fetchHandler from "@utils/fetchHandler";

export default async function addAdmin(formData: FormData): Promise<any> {
  const endpoint = "/api/admin/add-admin";
  const session = getSessionToken();

  try {
    const formDataObject = Object.fromEntries(formData.entries());

    const result = await fetchHandler<any>(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(formDataObject),
        cache: "no-cache",
      },
      session!
    );

    return result;
  } catch (error) {
    console.error("An error occurred while adding admin:", error);
    throw error;
  }
}
