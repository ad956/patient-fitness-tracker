import { dbConfig, getModelByRole } from "@utils/index";
import bcrypt from "bcrypt";
import { SecurityBody } from "@pft-types/index";
import { Types } from "mongoose";

export async function PUT(req: Request) {
  try {
    const id = req.headers.get("x-user-id");
    const role = req.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    const user_id = new Types.ObjectId(id);

    const { currentPassword, newPassword }: SecurityBody = await req.json();

    if (!currentPassword || !newPassword) {
      return Response.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    await dbConfig();

    let UserModel = getModelByRole(role);

    const user = await UserModel.findById(user_id);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return Response.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);

    const updatedUser = await UserModel.findByIdAndUpdate(
      user_id,
      { $set: { password: hashedNewPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        { error: "Error updating password" },
        { status: 500 }
      );
    }

    return Response.json(
      { msg: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: "Error updating password" }, { status: 500 });
  }
}

// hashing the password
async function hashPassword(password: string) {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
