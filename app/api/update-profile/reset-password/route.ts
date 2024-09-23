import { NextResponse } from "next/server";
import {
  dbConfig,
  getModelByRole,
  errorHandler,
  STATUS_CODES,
  hashPassword,
} from "@utils/index";
import bcrypt from "bcrypt";
import { SecurityBody } from "@pft-types/index";
import { Types } from "mongoose";
import { authenticateUser } from "@lib/auth";

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const user_id = new Types.ObjectId(id);
    const { currentPassword, newPassword }: SecurityBody = await req.json();

    if (!currentPassword || !newPassword) {
      return errorHandler(
        "Current password and new password are required",
        STATUS_CODES.BAD_REQUEST
      );
    }

    await dbConfig();
    const UserModel = getModelByRole(role);

    const user = await UserModel.findById(user_id);
    if (!user) {
      return errorHandler("User not found", STATUS_CODES.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return errorHandler(
        "Current password is incorrect",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);
    const updatedUser = await UserModel.findByIdAndUpdate(
      user_id,
      { $set: { password: hashedNewPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return errorHandler("Error updating password", STATUS_CODES.SERVER_ERROR);
    }

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return errorHandler("Error updating password", STATUS_CODES.SERVER_ERROR);
  }
}
