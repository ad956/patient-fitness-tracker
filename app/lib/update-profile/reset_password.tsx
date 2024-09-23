import fetchHandler from "@utils/fetchHandler";

export default async function resetPassword(
  currentPassword: string,
  newPassword: string
) {
  const endpoint = "/api/update-profile/reset-password";

  try {
    const result = await fetchHandler(endpoint, {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    return result;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}
