"use server";
import fetchHandler from "@utils/customFetch";

export default async function addAdmin(formData: FormData) {
  const endpoint = "/api/admin/add-admin";

  try {
    const formDataObject = Object.fromEntries(formData.entries());

    const result = await fetchHandler(endpoint, {
      method: "POST",
      body: JSON.stringify(formDataObject),
      cache: "no-cache",
    });

    return result;
  } catch (error) {
    console.error("An error occurred while adding admin:", error);
    return { error: "An unexpected error occurred" };
  }
}
