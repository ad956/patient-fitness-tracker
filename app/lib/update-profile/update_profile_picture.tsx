import fetchHandler from "@utils/fetchHandler";

async function updateProfilePicture(profile_url: string) {
  const endpoint = "/api/update-profile/profile";

  try {
    const result = await fetchHandler(endpoint, {
      method: "PUT",
      body: JSON.stringify(profile_url),
    });

    return result;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error;
  }
}

export default updateProfilePicture;
