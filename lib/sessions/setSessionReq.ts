export default async function setSessionReq(email: string, role: string) {
  const res = await fetch(`http://localhost:3000/api/auth/session`, {
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
