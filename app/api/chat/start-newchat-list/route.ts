import { NextResponse } from "next/server";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { Types } from "mongoose";
import { authenticateUser } from "@lib/auth";
import { Doctor, Patient } from "@models/index";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const _id = new Types.ObjectId(id); // for patient || doctor
    await dbConfig();

    // when patient wants to start a chat with doctor
    if (role === "patient") {
      // find all doctors who have this patient_id in their patients array
      const doctors = await Doctor.find(
        { patients: { $in: [_id] } },
        {
          firstname: 1,
          lastname: 1,
          profile: 1,
          specialty: 1,
          _id: 1,
        }
      );

      if (!doctors || doctors.length === 0) {
        return [];
      }

      return NextResponse.json(doctors, { status: 200 });
    }

    // when doctor wants to start a chat with patient
    const { patients: patient_ids } = await Doctor.findById(_id).select(
      "patients"
    );

    if (!patient_ids || patient_ids.length === 0) {
      return [];
    }

    const patients = await Patient.find({
      _id: {
        $in: patient_ids.map(
          (patient_id: string) => new Types.ObjectId(patient_id)
        ),
      },
    }).select("firstname lastname profile");

    return NextResponse.json(patients, { status: 200 });
  } catch (error: any) {
    console.error("Error getting chatlist:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
