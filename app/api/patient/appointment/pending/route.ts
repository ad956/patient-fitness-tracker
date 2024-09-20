import dbConfig from "@utils/db";
import { Patient, BookedAppointment } from "@models/index";
import { Types } from "mongoose";

export async function POST(req: Request) {
  try {
    const { hospital_id }: { hospital_id: string } = await req.json();

    const id = req.headers.get("x-user-id");
    const role = req.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    const patient_id = new Types.ObjectId(id);

    await dbConfig();

    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    // Checking if a pending appointment request exists with the hospital
    const alreadyBookedAppointment = await BookedAppointment.findOne({
      patient_id: patient._id,
      "hospital.id": new Types.ObjectId(hospital_id),
      approved: "pending",
    });

    if (alreadyBookedAppointment) {
      return Response.json({ hasPendingAppointment: true }, { status: 200 });
    }

    return Response.json({ hasPendingAppointment: false }, { status: 200 });
  } catch (error) {
    console.error("Error checking pending appointments:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
