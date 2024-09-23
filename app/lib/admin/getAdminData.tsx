import fetchHandler from "@utils/customFetch";

export default async function getAdminData() {
  const endpoint = "/api/admin";

  try {
    const adminData = await fetchHandler(endpoint, {
      cache: "no-cache",
    });

    return adminData;
  } catch (error) {
    console.error("An error occurred while fetching admin data:", error);
    throw error;
  }
}
