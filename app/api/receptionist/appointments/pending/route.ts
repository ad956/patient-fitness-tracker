import dbConfig from "@utils/db";
import { Patient, BookedAppointment, Receptionist } from "@models/index";
import { Types } from "mongoose";

export async function GET(request: Request) {
  try {
    const id = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    const receptionist_id = new Types.ObjectId(id);

    await dbConfig();

    const currentHospitalResult = await Receptionist.findById(receptionist_id, {
      current_hospital: 1,
    });

    if (!currentHospitalResult) {
      return Response.json(
        { error: "Receptionist hospital isn't selected" },
        { status: 404 }
      );
    }
    const currentHospitalId = currentHospitalResult.current_hospital;

    const pendingAppointments = await BookedAppointment.find({
      approved: "pending",
      "hospital.id": currentHospitalId,
    });

    // Empty array returned if appointments are not found
    if (pendingAppointments.length === 0) {
      return Response.json(
        { patientDetails: [] },
        {
          status: 200,
        }
      );
    }

    const patientIds = pendingAppointments.map(
      (appointment) => appointment.patient_id
    );

    const patientDetails = await Patient.find(
      { _id: { $in: patientIds } },
      {
        firstname: 1,
        lastname: 1,
        email: 1,
        dob: 1,
        gender: 1,
        contact: 1,
        profile: 1,
        address: 1,
      }
    );

    // Adding disease, note, date, and timing to each patient detail
    const patientDetailsWithAdditionalInfo = patientDetails.map((patient) => {
      const appointment = pendingAppointments.find(
        (appointment) =>
          appointment.patient_id.toString() === patient._id.toString()
      );
      if (appointment) {
        return {
          ...patient.toObject(),
          disease: appointment.disease,
          note: appointment.note,
          date: appointment.date,
          timing: appointment.timing,
        };
      }
      return patient.toObject();
    });

    return Response.json(
      { patientDetails: patientDetailsWithAdditionalInfo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching pending patient appointments:", error);
    return Response.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
