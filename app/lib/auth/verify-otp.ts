export default async function verifyOtp(
  usernameOrEmail: string,
  role: string,
  action: string,
  otp: string
): Promise<any> {
  const endpoint = "/api/auth/verify-otp";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, usernameOrEmail, role, action }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "OTP verification failed" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}
