import fetchHandler from "@utils/customFetch";

export async function getHospitalsList(
  currentPage: number = 1,
  pageSize: number = 10
) {
  const endpoint = `/api/admin/hospitals?page=${currentPage}&limit=${pageSize}`;

  try {
    const data = await fetchHandler(endpoint);

    return {
      hospitals: data.hospitals,
      pagination: data.pagination,
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
  const endpoint = `/api/admin/hospitals/users?hospitalId=${hospitalId}&page=${currentPage}&limit=${pageSize}`;

  try {
    const data = await fetchHandler(endpoint);

    return {
      users: data.users,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("An error occurred while fetching hospital details:", error);
    throw error;
  }
}
