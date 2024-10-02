import { NextResponse } from "next/server";
import Hospital from "@models/hospital";
import { Types } from "mongoose";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { authenticateUser } from "@lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const hospital_id = new Types.ObjectId(id);

    await dbConfig();

    const hospitalData = await Hospital.findById(hospital_id);

    if (!hospitalData) {
      return errorHandler("Hospital not found", STATUS_CODES.NOT_FOUND);
    }

    return NextResponse.json(hospitalData, { status: 200 });
  } catch (error) {
    console.error("Error fetching Hospital data:", error);
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}
