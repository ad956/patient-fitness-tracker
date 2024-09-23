"use server";
import toast from "react-hot-toast";
import fetchHandler from "@utils/fetchHandler";

const handleDemoUserLogin = async (
  role: string,
  redirectDemoUser: (role: string) => void
) => {
  const endpoint = "/api/demouser";

  try {
    toast.loading("Logging in...", { id: "demoLogin" });

    const result = await fetchHandler(endpoint, {
      method: "POST",
      body: JSON.stringify({ role }),
      cache: "no-cache",
    });

    if (!result.success) {
      console.error("Error while demo user login:", result.error);
      return { success: false, error: result.error };
    }

    toast.success("Login successful, redirecting...", { id: "demoLogin" });
    redirectDemoUser(role);
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

export default handleDemoUserLogin;
