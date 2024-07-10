import { decrypt } from "@sessions/sessionUtils";
import dbConfig from "@utils/db";
import Patient from "@models/patient";
import bcrypt from "bcrypt";

type SecurityBody = {
  password: string;
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

    const { password }: SecurityBody = await req.json();

    if (!password) {
      return Response.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedPatient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    return Response.json({ msg: "ok" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Error updating address" }, { status: 500 });
  }
}

// hashing the password
async function hashPassword(password: string) {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
