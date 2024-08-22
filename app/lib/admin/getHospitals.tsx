"use server";

import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export async function getHospitalsList(
  currentPage: number = 1,
  pageSize: number = 10
) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  try {
    const response = await fetch(
      `${serverUrl}/api/admin/hospitals?page=${currentPage}&limit=${pageSize}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hospitals list");
    }

    const data = await response.json();

    return {
      hospitals: data.hospitals,
      pagination: {
        currentPage: data.pagination.currentPage,
        pageSize: data.pagination.pageSize,
        totalPages: data.pagination.totalPages,
        totalCount: data.pagination.totalCount,
      },
    };
  } catch (error) {
    console.error("An error occurred while fetching hospitals list:", error);
    throw error;
  }
}

export async function getHospitalDetails(
  hospitalId: string,
  currentPage: number = 1,
  pageSize: number = 10
) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  try {
    const response = await fetch(
      `${serverUrl}/api/admin/hospitals/users?hospitalId=${hospitalId}&page=${currentPage}&limit=${pageSize}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hospital users details");
    }

    const data = await response.json();

    return {
      users: data.users,
      pagination: {
        currentPage: data.pagination.currentPage,
        pageSize: data.pagination.pageSize,
        totalPages: data.pagination.totalPages,
        totalCount: data.pagination.totalCount,
      },
    };
  } catch (error) {
    console.error("An error occurred while fetching hospital details:", error);
    throw error;
  }
}
