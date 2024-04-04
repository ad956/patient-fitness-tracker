export default async function getSessionReq() {
  const res = await fetch(`http://localhost:3000/api/auth/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getSessionData = await res.json();
  return getSessionData.res;
}
