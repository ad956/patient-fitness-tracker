import { NextResponse } from "next/server";
import HospitalDetails from "@models/hospital_details";
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

    const hospitalDetailsData = await HospitalDetails.findOne({
      hospitalId: hospital_id,
    });

    if (!hospitalDetailsData) {
      return errorHandler("Hospital details not found", STATUS_CODES.NOT_FOUND);
    }

    return NextResponse.json(hospitalDetailsData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Hospital details:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
