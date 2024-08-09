import logUserActivity from "@lib/logs";

type DemoUserBody = {
  username: string;
  name: string;
  email: string;
  role: string;
  action: string;
};

export async function POST(req: Request) {
  try {
    const body: DemoUserBody = await req.json();

    // Validate the incoming body
    if (!body || !body.username || !body.email || !body.role || !body.action) {
      return Response.json(
        {
          error:
            "Invalid request body. Please provide username, email, role, and action.",
        },
        { status: 400 }
      );
    }

    // Call the method to log user activity
    await logUserActivity(body, req);

    // Return a success response
    return Response.json(
      { message: "Demo User activity logged successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login: ", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
