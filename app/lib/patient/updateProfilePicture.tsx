async function updateProfilePicture(profile_url: string) {
  const res = await fetch("/api/patient/update-profile/profile", {
    method: "PUT",
    body: JSON.stringify(profile_url),
  });

  const isProfileUpdated = await res.json();

  return isProfileUpdated;
}

export default updateProfilePicture;
