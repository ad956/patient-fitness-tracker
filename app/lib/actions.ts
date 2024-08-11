"use server";

import { logout, setSession } from "@sessions/sessionUtils";
import { redirect } from "next/navigation";
import getBaseUrl from "@utils/getBaseUrl";
import getModelByRole from "@utils/getModelByRole";
import logDemoUser from "./demo-user/logDemoUser";
import DemoUser from "@models/demouser";
import { dbConfig } from "@/utils";

export async function loginAction(formData: FormData) {
  const usernameOrEmail = formData.get("usernameOrEmail");
  const password = formData.get("password");
  const role = formData.get("role");

  const serverUrl = getBaseUrl();

  try {
    const response = await fetch(`${serverUrl}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ usernameOrEmail, password, role }),
    });

    const userData = await response.json();

    if (!response.ok) {
      return { msg: userData.error, unauthorized: true };
    } else return userData;
  } catch (error) {
    console.error("Login failed:", error);
  }
}

export async function demoLoginAction(role: string) {
  try {
    /******************************************************
     *                                                    *
     *      ___          _____                            *
     *     /  /\        /  /::\                           *
     *    /  /::\      /  /:/\:\                          *
     *   /  /:/\:\    /  /:/  \:\                         *
     *  /  /:/~/::\  /__/:/ \__\:|                        *
     * /__/:/ /:/\:\ \  \:\ /  /:/                        *
     * \  \:\/:/__\/  \  \:\  /:/                         *
     *  \  \::/        \  \:\/:/                          *
     *   \  \:\         \  \::/                           *
     *    \  \:\         \__\/                            *
     *     \__\/                                          *
     *                                                    *
     * Note to self: Databases don't configure themselves *
     * Pro tip: Always dbConfig() before you wreck yo'self*
     *                                                    *
     ******************************************************/
    await dbConfig();

    const demoUser = await DemoUser.findOne({
      role,
    });

    if (!demoUser) {
      return { success: false, error: "Demo user not found for this role" };
    }

    const UserModel = getModelByRole(role);

    const userData = await UserModel.findById(demoUser.referenceId);

    if (!userData) {
      return { success: false, error: "Demo user data not found" };
    }

    // Set the session
    await setSession(userData.email, role);

    const userLog = {
      username: userData.username,
      name: `${userData.firstname} ${userData.lastname}`,
      email: userData.email,
      role: userData.role,
      action: "demouser-login",
    };

    // log activity
    await logDemoUser(userLog);

    return { success: true, redirectUrl: `/${role}` };
  } catch (error) {
    console.error("Demo login error:", error);
    return { success: false, error: "An unexpected error occurred" };
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

  try {
    const serverUrl = getBaseUrl();
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
