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

export default async function PUT(req: Request) {
  const email = "anandsuthar956@gmail.com";

  const updateData: PersonalInfoBody = await req.json();

  // Remove undefined fields
  Object.keys(updateData).forEach((key) => {
    if (updateData[key as keyof PersonalInfoBody] === undefined) {
      delete updateData[key as keyof PersonalInfoBody];
    }
  });

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      { $set: updateData },
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
