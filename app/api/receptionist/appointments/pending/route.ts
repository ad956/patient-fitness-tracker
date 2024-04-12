import dbConfig from "@/lib/db";
import { decryptSessionToken } from "@sessions/sessionUtils";

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = session.split("Bearer ")[1];

    const decryptedUser = await decryptSessionToken(token);

    const email = decryptedUser.user.email;

    const db = await dbConfig();
    const receptionistCollection = db.collection("receptionist");
    const bookedAppointmentsCollection = db.collection("bookedAppointments");
    const patientCollection = db.collection("patient");

    // Find the current_hospital for the receptionist
    const projection = {
      _id: 0,
      current_hospital: 1,
    };
    const currentHospitalResult = await receptionistCollection.findOne(
      { email },
      { projection }
    );
    if (!currentHospitalResult) {
      return Response.json(
        { error: "Receptionist hospital isn't selected" },
        { status: 404 }
      );
    }
    const currentHospitalId = currentHospitalResult.current_hospital;

    // Find the patient_ids from bookedAppointments where approved is "pending" and hospital.id matches current_hospital
    const pendingAppointments = await bookedAppointmentsCollection
      .find({
        approved: "pending",
        "hospital.id": currentHospitalId,
      })
      .toArray();
    if (pendingAppointments.length === 0) {
      return Response.json(
        { error: "No pending appointments found for the current hospital" },
        { status: 404 }
      );
    }
    const patientIds = pendingAppointments.map(
      (appointment) => appointment.patient_id
    );

    const projection_patient = {
      firstname: 1,
      lastname: 1,
      email: 1,
      dob: 1,
      gender: 1,
      contact: 1,
      profile: 1,
      address: 1,
    };
    // Fetch patient details using patient_ids
    const patientDetails = await patientCollection
      .find({ _id: { $in: patientIds } }, { projection: projection_patient })
      .toArray();

    if (patientDetails.length === 0) {
      return Response.json(
        { error: "Patient details not found" },
        { status: 404 }
      );
    }

    return Response.json({ patientDetails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching  pending patient appointments:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
