import Patient from "@models/patient";

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
  const currentEmail = "anandsuthar956@gmail.com";

  const updateData: PersonalInfoBody = await req.json();

  // remove undefined fields
  Object.keys(updateData).forEach((key) => {
    if (updateData[key as keyof PersonalInfoBody] === undefined) {
      delete updateData[key as keyof PersonalInfoBody];
    }
  });

  try {
    // check for uniqueness of username, email, and contact
    if (updateData.username) {
      const existingUsername = await Patient.findOne({
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
      const existingEmail = await Patient.findOne({
        email: updateData.email,
        _id: {
          $ne: await Patient.findOne({ email: currentEmail }).select("_id"),
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
      const existingContact = await Patient.findOne({
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

    //  update the patient
    const updatedPatient = await Patient.findOneAndUpdate(
      { email: currentEmail },
      { $set: updateData },
      { new: true }
    );

    if (!updatedPatient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    return Response.json(
      { msg: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating patient information:", error);
    return Response.json(
      { error: "Failed to update personal information" },
      { status: 500 }
    );
  }
}
