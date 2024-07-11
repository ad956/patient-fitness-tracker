import { decrypt } from "@sessions/sessionUtils";
import dbConfig from "@utils/db";
import Patient from "@models/patient";
import bcrypt from "bcrypt";
import { error } from "console";

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

    const { currentPassword, newPassword }: SecurityBody = await req.json();

    if (!currentPassword || !newPassword) {
      return Response.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      patient.password
    );

    if (!isPasswordValid) {
      return Response.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);

    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      { $set: { password: hashedNewPassword } },
      { new: true }
    );

    if (!updatedPatient) {
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
