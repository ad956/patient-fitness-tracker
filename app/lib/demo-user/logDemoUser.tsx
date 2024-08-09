import getBaseUrl from "@utils/getBaseUrl";

export default async function logDemoUser(userLog: any) {
  const serverUrl = getBaseUrl();
  try {
    // Call the logging API
    const response = await fetch(`${serverUrl}/api/log-demo-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLog),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error logging user activity:", errorData.error);
    }
  } catch (error) {}
}
