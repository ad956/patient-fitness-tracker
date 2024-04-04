import React from "react";

export default async function setSessionReq(email: string, role: string) {
  const res = await fetch(`${process.env.SERVER_URL}auth/session`, {
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
  console.log("Session set response:", setSessionData);
}
