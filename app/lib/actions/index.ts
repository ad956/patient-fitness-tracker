"use server";

import { logout } from "@session";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData): Promise<any> {
  const usernameOrEmail = formData.get("usernameOrEmail");
  const password = formData.get("password");
  const role = formData.get("role");

  const endpoint = "/api/auth/login";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernameOrEmail, password, role }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error;
  }
}

export async function signupAction(formData: FormData): Promise<any> {
  const user = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const endpoint = "/api/auth/signup";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Signup failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("An error occurred during signup:", error);
    throw error;
  }
}

export async function logoutAction() {
  await logout();
  redirect("/");
}
