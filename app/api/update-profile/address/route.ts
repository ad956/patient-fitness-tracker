import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import getModelByRole from "@utils/getModelByRole";

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
    const userRole = decryptedUser.user.role;

    const addressData: AddressBody = await req.json();

    // removing undefined fields
    Object.keys(addressData).forEach((key) => {
      if (addressData[key as keyof AddressBody] === undefined) {
        delete addressData[key as keyof AddressBody];
      }
    });

    let UserModel = getModelByRole(userRole);

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json({ error: `${userRole} not found` }, { status: 404 });
    }

    const updatedAddress = {
      address_line_1: user.address.address_line_1,
      address_line_2: user.address.address_line_2,
      city: user.address.city,
      state: user.address.state,
      zip_code: user.address.zip_code,
      country: user.address.country,
      ...addressData,
    };

    user.address = updatedAddress;

    await user.save();

    return Response.json({ msg: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error updating address:", error);
    return Response.json({ error: "Error updating address" }, { status: 500 });
  }
}
