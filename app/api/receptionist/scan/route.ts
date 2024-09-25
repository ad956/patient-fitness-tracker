import { NextResponse } from "next/server";
import { BookedAppointment, Patient } from "@models/index";
import { authenticateUser } from "@lib/auth";
import { Types } from "mongoose";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");
  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const { email } = await req.json();
    console.log(email);

    await dbConfig();

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return errorHandler("Patient not found", STATUS_CODES.NOT_FOUND);
    }

    const appointment = await BookedAppointment.findOne({
      patient_id: new Types.ObjectId(patient._id),
      approved: "pending",
    });

    if (appointment) {
      await BookedAppointment.updateOne(
        { _id: appointment._id },
        { $set: { approved: "approved" } }
      );
    }

    return NextResponse.json(
      { message: "Successfully scanned QR" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error scanning patient QR code:", error);
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}
