import fetchHandler from "@utils/fetchHandler";

export default async function verifyOtp(
  usernameOrEmail: string,
  role: string,
  action: string,
  otp: string
) {
  const endpoint = "/api/auth/verifyotp";

  try {
    const result = await fetchHandler(endpoint, {
      method: "POST",
      body: JSON.stringify({
        otp,
        usernameOrEmail,
        role,
        action,
      }),
    });

    return result;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}
