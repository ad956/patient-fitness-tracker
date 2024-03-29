import dbConfig from "@/lib/db";

type AppointmentBody = {
  patient_email: string;
  date: string;
  state: string;
  city: string;
  hospital: string;
  disease: string;
  note: string;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response("Email parameter is missing", {
        status: 400,
      });
    }

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

    const appointments = await appointmentsCursor.toArray(); // Convert cursor to array

    if (appointments.length === 0) {
      return new Response(JSON.stringify({ error: "Appointments not found" }), {
        status: 404,
      });
    }

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

export async function POST(req: Request) {
  try {
    const body: AppointmentBody = await req.json();

    const { patient_email, date, state, city, hospital, disease, note } = body;

    const db = await dbConfig();
    const patient_collection = db.collection("patient");

    const patient = await patient_collection.findOne({ email: patient_email });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    const appointmentData = {
      date,
      state,
      city,
      hospital,
      disease,
      note,
      approved: "pending",
      patient_id: patient._id,
      doctor_id: null,
      receptionist_id: null,
    };

    const appointment_collection = db.collection("bookedAppointments");
    const res = await appointment_collection.insertOne(appointmentData);

    if (!res)
      return Response.json({
        msg: "Error saving appointment info",
      });

    return Response.json({
      msg: "Appointment request added successfully",
    });
  } catch (error) {
    console.error("Error adding appointment request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
