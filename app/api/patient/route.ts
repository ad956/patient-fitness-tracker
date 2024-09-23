import Patient from "@models/patient";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { authenticateUser } from "@lib/auth/authenticateUser";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler(
        "Missing user ID or role",
        STATUS_CODES.VALIDATION_ERROR
      );
    }

    const patient_id = new Types.ObjectId(id);
    await dbConfig();

    const projection = {
      role: 0,
      otp: 0,
      password: 0,
      current_hospital: 0,
    };

    const patientData = await Patient.findById(patient_id, projection);

    if (!patientData) {
      return errorHandler("Patient not found", STATUS_CODES.NOT_FOUND);
    }

    return NextResponse.json(patientData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching patient data:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
