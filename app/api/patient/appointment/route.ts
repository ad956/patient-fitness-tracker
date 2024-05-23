import dbConfig from "@lib/db";
import { bookingAppointment } from "@/types";
import { decrypt } from "@sessions/sessionUtils";
import { ObjectId } from "mongodb";

// getting patients approved appointments
export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    const db = await dbConfig();
    const patient_collection = db.collection("patient");
    const patient = await patient_collection.findOne({ email });

    if (!patient) {
      return new Response(JSON.stringify({ error: "Patient not found" }), {
        status: 404,
      });
    }

    const bookedAppointments_collection = db.collection("bookedAppointments");
    const appointmentsCursor = bookedAppointments_collection.find({
      patient_id: patient._id,
      approved: "approved",
    });

    const appointments = await appointmentsCursor.toArray(); // convert cursor to array

    if (appointments.length === 0) {
      return new Response(JSON.stringify({ error: "Appointments not found" }), {
        status: 404,
      });
    }

    const projection = {
      _id: 1,
      firstname: 1,
      lastname: 1,
      specialty: 1,
      profile: 1,
    };
    const doctorIds = appointments.map((appointment) => appointment.doctor_id);
    const doctor_collection = db.collection("doctor");
    const doctors = await doctor_collection
      .find({ _id: { $in: doctorIds } }, { projection })
      .toArray();

    appointments.forEach((appointment) => {
      const doctor = doctors.find(
        (doc) => doc._id.toString() === appointment.doctor_id.toString()
      );

      if (doctor) {
        appointment.doctor = {
          name: `${doctor.firstname} ${doctor.lastname}`,
          profile: doctor.profile,
          specialty: doctor.specialty,
        };
      }
    });

    return new Response(JSON.stringify(appointments), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting appointments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// booking an appointment
export async function POST(req: Request) {
  const session = req.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: bookingAppointment = await req.json();

    const { date, state, city, hospital, disease, note } = body;

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

    // const appointmentData = {
    //   date,
    //   state,
    //   city,
    //   hospital: {
    //     id: new ObjectId(hospital.hospital_id),
    //     name: hospital.hospital_name,
    //   },
    //   disease,
    //   note,
    //   approved: "pending",
    //   patient_id: patient._id,
    //   doctor_id: null,
    //   receptionist_id: null,
    // };

    // const res = await appointment_collection.insertOne(appointmentData);

    // if (!res)
    //   return Response.json({
    //     error: "Error saving appointment info",
    //   });

    return Response.json(
      {
        msg: "Appointment request added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding appointment request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
