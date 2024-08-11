import getBaseUrl from "@utils/getBaseUrl";

export default async function verifyOtp(
  usernameOrEmail: string,
  role: string,
  action: string,
  otp: string
) {
  const serverUrl = getBaseUrl();

  try {
    const response = await fetch(`${serverUrl}/api/auth/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        usernameOrEmail,
        role,
        action,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
