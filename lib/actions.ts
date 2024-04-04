"use server";

import { login, logout } from "@/lib/authUtils";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  try {
    const response = await fetch("http://localhost:3000/api/auth", {
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

export async function logoutAction() {
  await logout();
  redirect("/");
}
