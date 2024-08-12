import dbConfig from "@utils/db";
import logUserActivity from "@lib/logs";
import DemoUser from "@models/demouser";
import getModelByRole from "@utils/getModelByRole";
import { setSession } from "@sessions/sessionUtils";

export async function POST(req: Request) {
  await dbConfig();

  try {
    const { role } = await req.json();

    // Validate the incoming body
    if (!role || typeof role !== "string") {
      return Response.json(
        {
          success: false,
          error: "Invalid request body. Please provide a valid role.",
        },
        { status: 400 }
      );
    }

    // find person with exact role in demo_users collection
    const demoUser = await DemoUser.findOne({ role });

    if (!demoUser) {
      return Response.json(
        {
          success: false,
          error: "Demo user not found for this role",
        },
        { status: 404 }
      );
    }

    // get a usermodel with matching role
    const UserModel = getModelByRole(role);

    // find a user which have same ObjectId as demousers
    const userData = await UserModel.findById(demoUser.referenceId);

    if (!userData) {
      return Response.json(
        {
          success: false,
          error: "Demo user data not found",
        },
        { status: 404 }
      );
    }

    // setting session for demouser (stores jwt token in cookie named session)
    await setSession(userData.email, role);

    const userLog = {
      username: userData.username,
      name: `${userData.firstname} ${userData.lastname}`,
      email: userData.email,
      role: userData.role,
      action: "demouser-login",
    };

    // log activity
    await logUserActivity(userLog, req);

    return Response.json(
      {
        success: true,
        message: "Demo User logged in successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login: ", error);
    return Response.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
