import fetchHandler from "@utils/fetchHandler";

export default async function updatePersonal(filteredFields: any) {
  const endpoint = "/api/update-profile/personal";

  try {
    const result = await fetchHandler(endpoint, {
      method: "PUT",
      body: JSON.stringify(filteredFields),
    });

    return result;
  } catch (error) {
    console.error("Error updating personal information:", error);
    throw error;
  }
}
