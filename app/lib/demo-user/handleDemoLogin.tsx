"use client";

import { Selection } from "@nextui-org/react";
import { demoLoginAction } from "@lib/actions";
import toast from "react-hot-toast";

interface HandleDemoLoginProps {
  isRoleValid: boolean;
  role: Selection;
  handleDemoUserNavigation: (path: string) => void;
}

const handleDemoLogin = async ({
  isRoleValid,
  role,
  handleDemoUserNavigation,
}: HandleDemoLoginProps) => {
  if (!isRoleValid) {
    toast.error("Please select a role for demo login", {
      position: "bottom-center",
    });
    return;
  }
  const selectedRole = Array.from(role)[0] as string;

  try {
    toast.loading("Logging in...", { id: "demoLogin" });
    const result = await demoLoginAction(selectedRole);
    if (result.success && result.redirectUrl) {
      toast.success("Login successful, redirecting...", { id: "demoLogin" });
      handleDemoUserNavigation(result.redirectUrl);
    } else {
      throw new Error(
        result.success ? "Redirect URL is missing" : result.error
      );
    }
  } catch (error) {
    console.error("Demo login error:", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please try again.",
      { id: "demoLogin" }
    );
  }
};

export default handleDemoLogin;
