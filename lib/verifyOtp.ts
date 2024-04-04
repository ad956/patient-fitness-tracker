export default async function verifyOtp(
  email: string,
  role: string,
  otp: string
) {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/verifyotp`, {
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
