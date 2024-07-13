import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import getModelByRole from "@utils/getModelByRole";

export async function PUT(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile_pic = await request.json();

  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const patient_email = decryptedUser.user.email;
    const userRole = decryptedUser.user.role;

    await dbConfig();

    let UserModel = getModelByRole(userRole);

    const result = await UserModel.updateOne(
      { email: patient_email },
      { $set: { profile: profile_pic } }
    );

    if (!result) {
      return Response.json({ error: "Error updating profile picture" });
    }

    return Response.json({ msg: "ok" });
  } catch (error) {
    console.error("Error updating profile picture :", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
