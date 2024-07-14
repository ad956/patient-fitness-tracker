import { dbConfig, getModelByRole } from "@utils/index";
import { decrypt } from "@sessions/sessionUtils";
import bcrypt from "bcrypt";

type SecurityBody = {
  currentPassword: string;
  newPassword: string;
};

export async function PUT(req: Request) {
  await dbConfig();

  const session = req.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;
    const userRole = decryptedUser.user.role;

    const { currentPassword, newPassword }: SecurityBody = await req.json();

    if (!currentPassword || !newPassword) {
      return Response.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    let UserModel = getModelByRole(userRole);

    const user = await UserModel.findOne({ email });

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

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
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
