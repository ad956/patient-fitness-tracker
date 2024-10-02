import { NextResponse } from "next/server";
import { BookedAppointment, Receptionist } from "@models/index";
import { Types } from "mongoose";
import { authenticateUser } from "@lib/auth";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";

// get approved appointments
export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  const { searchParams } = new URL(request.url);
  const patient_id = searchParams.get("patient_id");

  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const receptionist_id = new Types.ObjectId(id);

    if (!patient_id) {
      return errorHandler("Patient ID is required", STATUS_CODES.BAD_REQUEST);
    }

    const patientObjectId = new Types.ObjectId(patient_id);

    await dbConfig();

    const appointments = await BookedAppointment.find({
      patient_id: patientObjectId,
      receptionist_id: { $exists: true },
    });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}

// approving appointments
export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");

  try {
    const { patient_id } = await request.json();
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const receptionist_id = new Types.ObjectId(id);

    await dbConfig();

    const receptionist = await Receptionist.findById(receptionist_id);

    if (!receptionist) {
      return errorHandler("Receptionist not found", STATUS_CODES.NOT_FOUND);
    }

    const updatedAppointment = await BookedAppointment.findOneAndUpdate(
      { approved: "pending", patient_id },
      { $set: { approved: "approved", receptionist_id: receptionist._id } },
      { new: true }
    );

    if (!updatedAppointment) {
      return errorHandler(
        "Something went wrong while approving the appointment.",
        STATUS_CODES.BAD_REQUEST
      );
    }

    return NextResponse.json(
      { appointment: updatedAppointment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating pending patient appointment:", error);
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}
