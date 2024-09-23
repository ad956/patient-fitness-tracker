import fetchHandler from "@utils/fetchHandler";

export default async function updateAddress(filteredFields: any) {
  const endpoint = "/api/update-profile/address";

  try {
    const result = await fetchHandler(endpoint, {
      method: "PUT",
      body: JSON.stringify(filteredFields),
    });

    return result;
  } catch (error) {
    console.error("Error updating address information:", error);
    throw error;
  }
}
