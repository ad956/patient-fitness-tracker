import dbConfig from "@lib/db";
import { ObjectId } from "mongodb";
import { decrypt } from "@sessions/sessionUtils";

export async function POST(req: Request) {
  const session = req.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const hospital_id: string = await req.json();

    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    const db = await dbConfig();
    const patient_collection = db.collection("patient");
    const appointment_collection = db.collection("bookedAppointments");

    const patient = await patient_collection.findOne({ email });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    // Checking if a pending appointment request exists with the hospital
    const alreadyBookedAppointment = await appointment_collection.findOne({
      patient_id: patient._id,
      "hospital.id": new ObjectId(hospital_id),
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
