import { getSession, logout, setSession } from "@sessions/sessionUtils";

// get session
export async function GET() {
  try {
    // from sessionUtils
    const res = await getSession();

    if (res) {
      return Response.json(
        { message: "Session get successfully", res },
        { status: 200 }
      );
    }

    return Response.json(
      { message: "Session isn't available", res },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error setting session:", error);
    return Response.json({ error: "Error setting session" }, { status: 500 });
  }
}

// setting session
export async function POST(req: Request) {
  const { email, role } = await req.json();

  try {
    // from sessionUtils
    await setSession(email, role);
    return Response.json(
      { message: "Session set successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error setting session:", error);
    return Response.json({ error: "Error setting session" }, { status: 500 });
  }
}
