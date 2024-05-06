"use server";

import { logout } from "@sessions/sessionUtils";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const serverUrl = process.env.BASE_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${serverUrl}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });

    const userData = await response.json();

    if (!response.ok) {
      return { msg: userData.error, unauthorized: true };
    } else return userData;
  } catch (error) {
    console.error("Login failed:", error);
  }
}

export async function signupAction(formData: FormData) {
  const [firstname, lastname, username, email, password, role] = [
    formData.get("firstname"),
    formData.get("lastname"),
    formData.get("username"),
    formData.get("email"),
    formData.get("password"),
    formData.get("role"),
  ];

  const user = { firstname, lastname, username, email, password, role };

  console.log(user);

  try {
    const serverUrl = process.env.BASE_URL || "http://localhost:3000";
    const response = await fetch(`${serverUrl}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(user),
    });

    const userData = await response.json();

    if (!response.ok) {
      return { msg: userData.error, failure: true };
    } else return userData;
  } catch (error) {
    console.error("Signup failed:", error);
  }
}

export async function logoutAction() {
  await logout();
  redirect("/");
}
