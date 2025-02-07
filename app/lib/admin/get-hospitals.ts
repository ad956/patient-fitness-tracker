"use server";

import fetchHandler from "@utils/fetch-handler";
import { getSessionToken } from "../session";
import {
  HospitalData,
  HospitalUserData,
  PaginationMetadata,
} from "@syncure-types/admin";

export async function getHospitalsList(
  currentPage: number = 1,
  pageSize: number = 10
): Promise<{
  hospitals: [HospitalData];
  pagination: PaginationMetadata;
}> {
  const endpoint = `/api/admin/hospitals?page=${currentPage}&limit=${pageSize}`;
  const session = getSessionToken();

  try {
    const response = await fetchHandler<{
      hospitals: [HospitalData];
      pagination: PaginationMetadata;
    }>(endpoint, {}, session!);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      hospitals: response.data!.hospitals,
      pagination: response.data!.pagination,
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
): Promise<{
  users: [HospitalUserData];
  pagination: PaginationMetadata;
}> {
  const endpoint = `/api/admin/hospitals/users?hospitalId=${hospitalId}&page=${currentPage}&limit=${pageSize}`;
  const session = getSessionToken();

  try {
    const response = await fetchHandler<{
      users: [HospitalUserData];
      pagination: PaginationMetadata;
    }>(endpoint, {}, session!);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      users: response.data!.users,
      pagination: response.data!.pagination,
    };
  } catch (error) {
    console.error("An error occurred while fetching hospital details:", error);
    throw error;
  }
}
