"use server";

import { login, logout } from "@/lib/authUtils";
import { User } from "@/types";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  try {
    const selectedRole = formData.get("role");
    const response = await fetch("http://localhost:3000/ap/auth", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Error(errorData.error || "Failed to login");
    }

    const userData = await response.json();
    return userData;

    // redirect(`/${selectedRole}`);
  } catch (error) {
    console.error("Login failed:", error);
  }
}

export async function logoutAction() {
  await logout();
  redirect("/");
}
