import dbConfig from "@lib/db";
import { decrypt } from "@sessions/sessionUtils";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const { patient_id } = await request.json();

    // Convert the patient_id string to an ObjectId
    const patientObjectId = new ObjectId(patient_id);

    const db = await dbConfig();
    const bookedAppointmentsCollection = db.collection("bookedAppointments");

    // Fetch the booked appointments for the specific patient and their receptionist
    const appointments = await bookedAppointmentsCollection
      .find({
        patient_id: patientObjectId,
        // Add the condition to filter by receptionist_id
        receptionist_id: { $exists: true },
      })
      .toArray();

    return new Response(JSON.stringify({ appointments }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { patient_id } = await request.json();
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);

    // Convert the patient_id string to an ObjectId
    const patientObjectId = new ObjectId(patient_id);

    const db = await dbConfig();

    const receptionistCollection = db.collection("receptionist");
    const bookedAppointmentsCollection = db.collection("bookedAppointments");

    const receptionist = await receptionistCollection.findOne({
      email: decryptedUser.user.email,
    });

    if (!receptionist) {
      return new Response(JSON.stringify({ error: "Receptionist not found" }), {
        status: 404,
      });
    }

    // Update the approved status of the pending appointment for the specific patient to "approved"
    const updateResult = await bookedAppointmentsCollection.updateOne(
      { approved: "pending", patient_id: patientObjectId },
      { $set: { approved: "approved", receptionist_id: receptionist._id } }
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
