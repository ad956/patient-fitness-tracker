"use server";

import { login, logout } from "@/lib/authUtils";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const redirectPath = formData.get("user-role");

  await login(formData);

  const user: User = {
    id: 1,
    name: "Anand",
    username: "ad956",
    email: "anandsuthar956@gmail.com",
  };

  redirect(`/${redirectPath}`);
}
export async function logoutAction() {
  await logout();
  redirect("/");
}
