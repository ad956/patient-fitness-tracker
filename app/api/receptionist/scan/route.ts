import dbConfig from "@utils/db";
import { ObjectId } from "mongodb";
import { BookedAppointment, Patient, Receptionist } from "@models/index";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    console.log(email);

    await dbConfig();

    // const waitingCollection = db.collection("waiting");

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return new Response(JSON.stringify({ error: "Patient not found" }), {
        status: 404,
      });
    }

    const appointment = await BookedAppointment.findOne({
      patient_id: new ObjectId(patient._id),
      approved: "pending",
    });

    if (appointment) {
      await BookedAppointment.updateOne(
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
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
