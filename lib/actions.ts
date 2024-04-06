"use server";

import { logout } from "@sessions/sessionUtils";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
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

  // try {
  //   const response = await fetch("http://localhost:3000/api/auth/signup", {
  //     method: "POST",
  //     body: JSON.stringify({ user }),
  //   });

  //   const userData = await response.json();

  //   if (!response.ok) {
  return { msg: "userData.error", failure: false };
  //   } else return userData;
  // } catch (error) {
  //   console.error("Login failed:", error);
  // }
}

export async function logoutAction() {
  await logout();
  redirect("/");
}
