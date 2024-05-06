import getBaseUrl from "@utils/getBaseUrl";

export default async function setSessionReq(email: string, role: string) {
  const serverUrl = getBaseUrl();

  const res = await fetch(`${serverUrl}/api/auth/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      role,
    }),
  });
  const setSessionData = await res.json();
  return setSessionData;
}
