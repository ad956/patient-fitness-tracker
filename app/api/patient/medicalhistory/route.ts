import { Patient, MedicalHistory } from "@models/index";
import { Types } from "mongoose";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const id = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const patient_id = new Types.ObjectId(id);
    await dbConfig();

    const patient = await Patient.findById(patient_id, { _id: 1 }).exec();
    if (!patient) {
      return errorHandler("Patient not found", STATUS_CODES.NOT_FOUND);
    }

    const medicalHistory = await MedicalHistory.find(
      { patient: patient._id },
      {
        hospital: 1,
        doctor: 1,
        start_date: 1,
        end_date: 1,
        TreatmentStatus: 1,
        disease: 1,
      }
    )
      .populate("hospital", ["firstname", "lastname", "profile"])
      .populate("doctor", ["firstname", "lastname", "profile"])
      .exec();

    const formattedMedicalHistory = medicalHistory.map((history) => ({
      hospital: {
        name: `${history.hospital.firstname} ${history.hospital.lastname}`,
        profile: history.hospital.profile,
      },
      doctor: {
        name: `${history.doctor.firstname} ${history.doctor.lastname}`,
        profile: history.doctor.profile,
      },
      start_date: history.start_date,
      end_date: history.end_date,
      TreatmentStatus: history.TreatmentStatus,
      disease: history.disease,
    }));

    return NextResponse.json(formattedMedicalHistory, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching medical history of patient:", error);
    return errorHandler(
      error.message || "Failed to fetch medical history",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
