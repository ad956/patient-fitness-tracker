import { NextResponse } from "next/server";
import Doctor from "@models/doctor";
import { Types } from "mongoose";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import authenticateUser from "@lib/auth/authenticateUser";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const doctor_id = new Types.ObjectId(id);

    await dbConfig();

    const doctorData = await Doctor.findById(doctor_id);

    if (!doctorData) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctorData);
  } catch (error) {
    console.error("Error fetching Doctor data:", error);
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}
