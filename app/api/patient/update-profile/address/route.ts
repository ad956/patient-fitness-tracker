import dbConfig from "@utils/db";
import Patient from "@models/patient";
import { decrypt } from "@sessions/sessionUtils";

type AddressBody = {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
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

    const addressData: AddressBody = await req.json();

    // removing undefined fields
    Object.keys(addressData).forEach((key) => {
      if (addressData[key as keyof AddressBody] === undefined) {
        delete addressData[key as keyof AddressBody];
      }
    });

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    const updatedAddress = {
      address_line_1: patient.address.address_line_1,
      address_line_2: patient.address.address_line_2,
      city: patient.address.city,
      state: patient.address.state,
      zip_code: patient.address.zip_code,
      country: patient.address.country,
      ...addressData,
    };

    patient.address = updatedAddress;

    console.table(patient.address);

    await patient.save();

    return Response.json({ msg: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error updating address:", error);
    return Response.json({ error: "Error updating address" }, { status: 500 });
  }
}
