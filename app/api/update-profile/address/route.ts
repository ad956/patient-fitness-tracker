import { NextResponse } from "next/server";
import { AddressBody } from "@syncure-types/index";
import {
  dbConfig,
  getModelByRole,
  errorHandler,
  STATUS_CODES,
} from "@utils/index";
import { Types } from "mongoose";
import { authenticateUser } from "@lib/auth";

export async function PUT(req: Request) {
  const authHeader = req.headers.get("Authorization");
  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const user_id = new Types.ObjectId(id);
    const addressData: AddressBody = await req.json();

    await dbConfig();

    // remove undefined fields
    Object.keys(addressData).forEach((key) => {
      if (addressData[key as keyof AddressBody] === undefined) {
        delete addressData[key as keyof AddressBody];
      }
    });

    const UserModel = getModelByRole(role);
    const user = await UserModel.findById(user_id);

    if (!user) {
      return errorHandler(`${role} not found`, STATUS_CODES.NOT_FOUND);
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

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating address:", error);
    return errorHandler(
      error.message || "Error updating address",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
