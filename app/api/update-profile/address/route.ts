import { AddressBody } from "@pft-types/index";
import { dbConfig, getModelByRole } from "@utils/index";
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

    // any user of system
    const user_id = new Types.ObjectId(id);

    const addressData: AddressBody = await req.json();

    await dbConfig();

    // removing undefined fields
    Object.keys(addressData).forEach((key) => {
      if (addressData[key as keyof AddressBody] === undefined) {
        delete addressData[key as keyof AddressBody];
      }
    });

    let UserModel = getModelByRole(role);

    const user = await UserModel.findById(user_id);

    if (!user) {
      return Response.json({ error: `${role} not found` }, { status: 404 });
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
