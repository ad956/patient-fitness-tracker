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
