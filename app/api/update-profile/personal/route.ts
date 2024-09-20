import { dbConfig, getModelByRole } from "@utils/index";
import { PersonalInfoBody } from "@pft-types/index";
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

    const updateData: PersonalInfoBody = await req.json();

    await dbConfig();

    // remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key as keyof PersonalInfoBody] === undefined) {
        delete updateData[key as keyof PersonalInfoBody];
      }
    });

    let UserModel = getModelByRole(role);

    // check for uniqueness of username, email, and contact
    if (updateData.username) {
      const existingUsername = await UserModel.findOne({
        username: updateData.username,
        _id: { $ne: user_id },
      });
      if (existingUsername) {
        return Response.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }
    }

    if (updateData.email) {
      const existingEmail = await UserModel.findOne({
        email: updateData.email,
        _id: {
          $ne: user_id,
        },
      });
      if (existingEmail) {
        return Response.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    if (updateData.contact) {
      const existingContact = await UserModel.findOne({
        contact: updateData.contact,
        _id: { $ne: user_id },
      });
      if (existingContact) {
        return Response.json(
          { error: "Contact number already exists" },
          { status: 400 }
        );
      }
    }

    //  update the user
    const updatedUser = await UserModel.findByIdAndUpdate(
      user_id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({ error: `${role} not found` }, { status: 404 });
    }

    return Response.json(
      { msg: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating personal information:", error);
    return Response.json(
      { error: "Failed to update personal information" },
      { status: 500 }
    );
  }
}
