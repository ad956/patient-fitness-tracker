import dbConfig from "@/lib/db";
import { decryptSessionToken } from "@sessions/sessionUtils";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const { patient_id } = await request.json();

    // Convert the patient_id string to an ObjectId
    const patientObjectId = new ObjectId(patient_id);

    const db = await dbConfig();
    const bookedAppointmentsCollection = db.collection("bookedAppointments");

    // Update the approved status of the pending appointment for the specific patient to "approved"
    const updateResult = await bookedAppointmentsCollection.updateOne(
      { approved: "pending", patient_id: patientObjectId },
      { $set: { approved: "approved" } }
    );

    // Check if any document was updated
    if (updateResult.modifiedCount === 0) {
      return new Response(
        JSON.stringify({
          error: "No pending appointment found for the specified patient",
        }),
        { status: 404 }
      );
    }

    // Fetch the updated appointment for the specific patient
    const updatedAppointment = await bookedAppointmentsCollection.findOne({
      approved: "approved",
      patient_id: patientObjectId,
    });

    return new Response(JSON.stringify({ appointment: updatedAppointment }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating pending patient appointment:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
