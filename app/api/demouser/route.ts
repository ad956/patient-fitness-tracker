import { NextResponse } from "next/server";
import DemoUser from "@models/demouser";
import { setSession } from "@sessions/sessionUtils";
import logUserActivity from "@lib/logs";
import {
  dbConfig,
  errorHandler,
  getModelByRole,
  STATUS_CODES,
} from "@utils/index";

export async function POST(req: Request) {
  await dbConfig();

  try {
    const { role } = await req.json();

    // validate the incoming body
    if (!role || typeof role !== "string") {
      return errorHandler(
        "Invalid request body. Please provide a valid role.",
        STATUS_CODES.BAD_REQUEST
      );
    }

    // find person with exact role in demo_users collection
    const demoUser = await DemoUser.findOne({ role });

    if (!demoUser) {
      return errorHandler(
        "Demo user not found for this role",
        STATUS_CODES.NOT_FOUND
      );
    }

    // get a user model with matching role
    const UserModel = getModelByRole(role);

    // find a user which has the same ObjectId as demo users
    const userData = await UserModel.findById(demoUser.referenceId);

    if (!userData) {
      return errorHandler("Demo user data not found", STATUS_CODES.NOT_FOUND);
    }

    // setting session for demo user (stores jwt token in cookie named session)
    await setSession(userData._id, role);

    const userLog = {
      username: userData.username,
      name: `${userData.firstname} ${userData.lastname}`,
      email: userData.email,
      role: userData.role,
      action: "demouser-login",
    };

    // log activity
    await logUserActivity(userLog, req);

    return NextResponse.json(
      {
        success: true,
        message: "Demo User logged in successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login: ", error);
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}
