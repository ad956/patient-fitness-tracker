import Patient from "@models/patient";

type AddressBody = {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
};

export async function PUT(req: Request) {
  const email = "anandsuthar956@gmail.com";

  const addressData: AddressBody = await req.json();

  // Remove undefined fields
  Object.keys(addressData).forEach((key) => {
    if (addressData[key as keyof AddressBody] === undefined) {
      delete addressData[key as keyof AddressBody];
    }
  });

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      { $set: { address: addressData } },
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
