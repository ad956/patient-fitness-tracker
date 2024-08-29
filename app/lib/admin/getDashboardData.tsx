"use server";

import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export async function getTilesData() {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/admin/dashboard/tiles`, {
      headers,
      next: {
        revalidate: 5000,
      },
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

export async function getRecentUsersData(page: number) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(
      `${serverUrl}/api/admin/dashboard/recent-users?page=${page}&limit=10`,
      {
        headers,
        next: {
          revalidate: 5000,
        },
      }
    );

    if (!res.ok) {
      console.error(`Error fetching admin data: ${res.statusText}`);
      throw new Error("fetching admin data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("An error occurred while fetching admin data:", error);
    throw error;
  }
}
