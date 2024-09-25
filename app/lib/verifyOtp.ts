import fetchHandler from "@utils/fetchHandler";

export default async function verifyOtp(
  usernameOrEmail: string,
  role: string,
  action: string,
  otp: string
): Promise<any> {
  const endpoint = "/api/auth/verifyotp";

  try {
    const response = await fetchHandler<any>(endpoint, {
      method: "POST",
      body: JSON.stringify({
        otp,
        usernameOrEmail,
        role,
        action,
      }),
    });

    if (response.error) return { error: response.error.message };

    return response.data!;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}
