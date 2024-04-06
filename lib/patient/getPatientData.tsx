import { getAccessToken } from "../sessions/sessionUtils";

export async function getPatientData() {
  const token = await getAccessToken();
  console.log("giving  token :" + token);

  if (!token) {
    console.log("Session expired");
    return;
  }

  const res = await fetch(`http://localhost:3000/api/patient`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) throw new Error("Fetching Single User failed");

  // used when working with dynamicParams and notFound() from next/navigation
  // if (!res.ok) return undefined;
  return res.json();
}
