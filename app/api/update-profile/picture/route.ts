import { NextResponse } from "next/server";
import {
  dbConfig,
  getModelByRole,
  errorHandler,
  STATUS_CODES,
} from "@utils/index";
import { Types } from "mongoose";
import { authenticateUser } from "@lib/auth";
import { revalidateTag } from "next/cache";

export async function PUT(request: Request) {
  const authHeader = request.headers.get("Authorization");
  try {
    const profile_pic = await request.json();

    const { id, role } = await authenticateUser(authHeader);

    // check for missing user ID or role
    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const user_id = new Types.ObjectId(id);
    await dbConfig();

    const UserModel = getModelByRole(role);

    const result = await UserModel.findByIdAndUpdate(
      user_id,
      { $set: { profile: profile_pic } },
      { new: true }
    );

    if (!result) {
      return errorHandler(
        "Error updating profile picture",
        STATUS_CODES.NOT_FOUND
      );
    }

    revalidateTag("profile");

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}
