"use server";

import { logout } from "@session";
import { redirect } from "next/navigation";
import fetchHandler from "@utils/fetch-handler";

export async function loginAction(formData: FormData): Promise<any> {
  const usernameOrEmail = formData.get("usernameOrEmail");
  const password = formData.get("password");
  const role = formData.get("role");

  const endpoint = "/api/auth/login";

  return await fetchHandler<any>(endpoint, {
    method: "POST",
    body: JSON.stringify({ usernameOrEmail, password, role }),
  });
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
  return await fetchHandler<any>(endpoint, {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function logoutAction() {
  await logout();
  redirect("/");
}
