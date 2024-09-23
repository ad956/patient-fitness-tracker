import fetchHandler from "@utils/fetchHandler";

export async function getTilesData() {
  const endpoint = "/api/admin/dashboard/tiles";

  try {
    const adminData = await fetchHandler(endpoint, {
      next: {
        revalidate: 5000,
      },
    });

    return adminData;
  } catch (error) {
    console.error("An error occurred while fetching admin data:", error);
    throw error;
  }
}

export async function getRecentUsersData(page: number) {
  const endpoint = `/api/admin/dashboard/recent-users?page=${page}&limit=10`;

  try {
    const data = await fetchHandler(endpoint, {
      next: {
        revalidate: 5000,
      },
    });

    return data;
  } catch (error) {
    console.error("An error occurred while fetching admin data:", error);
    throw error;
  }
}
