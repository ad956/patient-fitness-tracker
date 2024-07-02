import { User } from "@types";
import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";

type UpdatedUserType = Omit<User, "_id">;

export async function PUT(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    firstname,
    lastname,
    username,
    email,
    dob,
    gender,
    contact,
    profile,
    address,
  } = await request.json();

  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const patient_email = decryptedUser.user.email;

    const db = await dbConfig();
    const collection = db.collection("patient");

    const updatedFields: UpdatedUserType = {
      firstname: "",
      username: "",
      email: "",
      dob: "",
      lastname: "",
      contact: "",
      gender: "",
      address: {
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
      },
      profile: "",
    };

    if (firstname) updatedFields.firstname = firstname;
    if (email) updatedFields.email = email;
    // if (password) updatedFields.password = password;
    if (profile) updatedFields.profile = profile;

    const result = await collection.updateOne(
      { email: patient_email },
      { $set: updatedFields }
    );

    return Response.json({});
  } catch (error) {
    console.error("Error updating patient profile :", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
