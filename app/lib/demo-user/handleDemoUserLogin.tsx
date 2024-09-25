import toast from "react-hot-toast";
import fetchHandler from "@utils/fetchHandler";

const handleDemoUserLogin = async (
  role: string,
  redirectDemoUser: (role: string) => void
) => {
  const endpoint = "/api/demouser";

  try {
    toast.loading("Logging in...", { id: "demoLogin" });

    const response = await fetchHandler(endpoint, {
      method: "POST",
      body: JSON.stringify({ role }),
      cache: "no-cache",
    });

    if (response.error) {
      console.error("Error while demo user login:", response.error);
      toast.error(`${response.error.message}`);
      return;
    }

    toast.success("Login successful, redirecting...", { id: "demoLogin" });
    redirectDemoUser(role);
  } catch (error) {
    console.error("Demo login error:", error);
    toast.error("An unexpected error occurred. Please try again.", {
      id: "demoLogin",
    });
  }
};

export default handleDemoUserLogin;
