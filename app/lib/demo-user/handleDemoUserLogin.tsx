import toast from "react-hot-toast";
import getBaseUrl from "@utils/getBaseUrl";

const handleDemoUserLogin = async (
  role: string,
  redirectDemoUser: (role: string) => void
) => {
  try {
    toast.loading("Logging in...", { id: "demoLogin" });

    const serverUrl = getBaseUrl();

    const response = await fetch(`${serverUrl}/api/demouser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error while demouser login:", result.error);
      return { success: false, error: result.error };
    }

    if (result.success) {
      toast.success("Login successful, redirecting...", { id: "demoLogin" });
      redirectDemoUser(role);
    } else {
      throw new Error(result.error || "Login failed");
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

export default handleDemoUserLogin;
