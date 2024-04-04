import { setSession } from "@/lib/sessions/sessionUtils";

// get session
export async function GET(req: Request) {
  const { email, role } = await req.json();

  try {
    // from authUtils
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

// setting session
export async function POST(req: Request) {
  const { email, role } = await req.json();

  try {
    // from authUtils
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
