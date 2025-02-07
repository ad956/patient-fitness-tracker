"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";
import { Admin } from "@syncure-types/index";

export default async function getAdminData(): Promise<Admin> {
  const endpoint = "/api/admin";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<Admin>(
      endpoint,
      {
        cache: "no-cache",
      },
      session!
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data!;
  } catch (error) {
    console.error("An error occurred while fetching admin data:", error);
    throw error;
  }
}
