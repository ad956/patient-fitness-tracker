import dbConfig from "@lib/db";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    console.log(email);

    const db = await dbConfig();
    const patientCollection = db.collection("patient");
    const bookedAppointmentCollection = db.collection("bookedAppointments");
    // const waitingCollection = db.collection("waiting");

    const patient = await patientCollection.findOne({ email });

    if (!patient) {
      return new Response(JSON.stringify({ error: "Patient not found" }), {
        status: 404,
      });
    }

    const appointment = await bookedAppointmentCollection.findOne({
      patient_id: new ObjectId(patient._id),
      approved: "pending",
    });

    if (appointment) {
      await bookedAppointmentCollection.updateOne(
        { _id: appointment._id },
        { $set: { approved: "approved" } }
      );
    }

    // const patientId = patient._id;

    // await waitingCollection.insertOne({ patientId });

    return new Response(
      JSON.stringify({ message: "Successfully scanned QR" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error scanning patient qr code:", error);
    // Return an error response
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
