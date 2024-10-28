import { NextResponse } from "next/server";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { Patient } from "@models/index";
import { Types } from "mongoose";
import { authenticateUser } from "@lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const patient_id = new Types.ObjectId(id);
    await dbConfig();

    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return errorHandler("Patient not found", STATUS_CODES.NOT_FOUND);
    }

    const labResults = [
      {
        id: "LR-001",
        test: "Complete Blood Count",
        date: "2024-10-14",
        status: "Completed",
        result: "Normal",
      },
      {
        id: "LR-002",
        test: "Lipid Profile",
        date: "2024-10-15",
        status: "Pending",
        result: "Awaiting",
      },
      {
        id: "LR-003",
        test: "Thyroid Function",
        date: "2024-10-16",
        status: "Processing",
        result: "In Progress",
      },
    ];

    return NextResponse.json(labResults, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching lab results: ", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
