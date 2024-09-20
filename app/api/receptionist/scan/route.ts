import dbConfig from "@utils/db";
import { BookedAppointment, Patient, Receptionist } from "@models/index";
import { Types } from "mongoose";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    console.log(email);

    await dbConfig();

    // const waitingCollection = db.collection("waiting");

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return Response.json(
        { error: "Patient not found" },
        {
          status: 404,
        }
      );
    }

    const appointment = await BookedAppointment.findOne({
      patient_id: new Types.ObjectId(patient._id),
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

    return Response.json(
      { message: "Successfully scanned QR" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error scanning patient qr code:", error);
    return Response.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
