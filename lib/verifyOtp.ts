import getBaseUrl from "@utils/getBaseUrl";

export default async function verifyOtp(
  email: string,
  role: string,
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
        email,
        role,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
