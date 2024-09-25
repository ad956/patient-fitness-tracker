import { NextResponse } from "next/server";
import authenticateUser from "@lib/auth/authenticateUser";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import Receptionist from "@models/receptionist";
import { Types } from "mongoose";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const receptionist_id = new Types.ObjectId(id);
    await dbConfig();

    const projection = {
      role: 0,
      otp: 0,
      password: 0,
      current_hospital: 0,
    };

    const receptionistData = await Receptionist.findById(
      receptionist_id,
      projection
    );
    if (!receptionistData) {
      return errorHandler("Receptionist not found", STATUS_CODES.NOT_FOUND);
    }

    return NextResponse.json(receptionistData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching receptionist data route:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
