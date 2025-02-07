"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";

export async function getTilesData(): Promise<TilesDataType> {
  const endpoint = "/api/admin/dashboard/tiles";
  const session = getSessionToken();

  try {
    const response = await fetchHandler<TilesDataType>(
      endpoint,
      {
        next: {
          revalidate: 5000,
        },
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

export async function getRecentUsersData(
  page: number
): Promise<PaginatedResponse> {
  const endpoint = `/api/admin/dashboard/recent-users?page=${page}&limit=10`;
  const session = getSessionToken();

  try {
    const response = await fetchHandler<PaginatedResponse>(
      endpoint,
      {
        next: {
          revalidate: 5000,
        },
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
