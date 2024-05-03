import dbConfig from "@/lib/db";
import { decrypt } from "@sessions/sessionUtils";

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    const db = await dbConfig();
    const receptionistCollection = db.collection("receptionist");
    const bookedAppointmentsCollection = db.collection("bookedAppointments");
    const patientCollection = db.collection("patient");

    const projection = {
      _id: 0,
      current_hospital: 1,
    };
    const currentHospitalResult = await receptionistCollection.findOne(
      { email },
      { projection }
    );
    if (!currentHospitalResult) {
      return new Response(
        JSON.stringify({ error: "Receptionist hospital isn't selected" }),
        { status: 404 }
      );
    }
    const currentHospitalId = currentHospitalResult.current_hospital;

    const pendingAppointments = await bookedAppointmentsCollection
      .find({ approved: "pending", "hospital.id": currentHospitalId })
      .toArray();

    //  empty array returned, If appointments are not found
    if (pendingAppointments.length === 0) {
      return new Response(JSON.stringify({ patientDetails: [] }), {
        status: 200,
      });
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
    const patientDetails = await patientCollection
      .find({ _id: { $in: patientIds } }, { projection: projection_patient })
      .toArray();

    // Adding disease, note, date, and timing to each patient detail
    const patientDetailsWithAdditionalInfo = patientDetails.map((patient) => {
      const appointment = pendingAppointments.find(
        (appointment) =>
          appointment.patient_id.toString() === patient._id.toString()
      );
      if (appointment) {
        return {
          ...patient,
          disease: appointment.disease,
          note: appointment.note,
          date: appointment.date,
          timing: appointment.timing,
        };
      }
      return patient;
    });

    return new Response(
      JSON.stringify({ patientDetails: patientDetailsWithAdditionalInfo }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching pending patient appointments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
