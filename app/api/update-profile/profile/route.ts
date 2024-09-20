import { dbConfig, getModelByRole } from "@utils/index";
import { Types } from "mongoose";

export async function PUT(request: Request) {
  try {
    const profile_pic = await request.json();

    const id = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    const user_id = new Types.ObjectId(id);

    await dbConfig();

    let UserModel = getModelByRole(role);

    const result = await UserModel.findByIdAndUpdate(user_id, {
      $set: { profile: profile_pic },
    });

    if (!result) {
      return Response.json({ error: "Error updating profile picture" });
    }

    return Response.json({ msg: "ok" });
  } catch (error) {
    console.error("Error updating profile picture :", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
