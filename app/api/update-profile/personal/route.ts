import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import getModelByRole from "@utils/getModelByRole";

type PersonalInfoBody = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  dob?: string;
  gender?: string;
  contact?: string;
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
    const currentEmail = decryptedUser.user.email;
    const userRole = decryptedUser.user.role;

    const updateData: PersonalInfoBody = await req.json();

    // remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key as keyof PersonalInfoBody] === undefined) {
        delete updateData[key as keyof PersonalInfoBody];
      }
    });

    let UserModel = getModelByRole(userRole);

    // check for uniqueness of username, email, and contact
    if (updateData.username) {
      const existingUsername = await UserModel.findOne({
        username: updateData.username,
        email: { $ne: currentEmail },
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
          $ne: await UserModel.findOne({ email: currentEmail }).select("_id"),
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
        email: { $ne: currentEmail },
      });
      if (existingContact) {
        return Response.json(
          { error: "Contact number already exists" },
          { status: 400 }
        );
      }
    }

    //  update the user
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: currentEmail },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({ error: `${userRole} not found` }, { status: 404 });
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
