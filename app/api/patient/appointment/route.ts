import dbConfig from "@/lib/db";

type AppointmentBody = {
  id: number;
  date: string;
  state: string;
  city: string;
  hospital: string;
  disease: string;
  note: string;
  approved: string;
};

export async function POST(req: Request) {
  try {
    const body: AppointmentBody = await req.json();

    const { id, date, state, city, hospital, disease, note, approved } = body;

    const appointmentData = {
      date,
      state,
      city,
      hospital,
      disease,
      note,
      approved,
    };

    const db = await dbConfig();
    const collection = db.collection("patient");

    const patient = await collection.findOne({ id });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    if (!Array.isArray(patient.bookAppointment)) {
      console.error("bookAppointment field is not an array");
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }

    patient.bookAppointment.push(appointmentData);

    await collection.updateOne(
      { id: 1 },
      { $set: { bookAppointment: patient.bookAppointment } }
    );

    console.log("Appointment request added for patient:", patient.id);

    return Response.json({
      msg: "Appointment request added successfully",
    });
  } catch (error) {
    console.error("Error adding appointment request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
