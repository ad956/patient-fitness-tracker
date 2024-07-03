import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import { BookedAppointment, Receptionist } from "@models/index";
import { Types } from "mongoose";

// get approved appointments
export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const role = decryptedUser.user.role;

    if (!role || role !== "receptionist") {
      return new Response(
        JSON.stringify({
          error: "You do not have permission to access this resource",
        }),
        {
          status: 401,
        }
      );
    }

    const { searchParams } = new URL(request.url);
    const patient_id = searchParams.get("patient_id");

    if (!patient_id) {
      return new Response(JSON.stringify({ error: "Patient id is required" }), {
        status: 400,
      });
    }

    // Convert the patient_id string to an ObjectId
    const patientObjectId = new Types.ObjectId(patient_id);

    await dbConfig();

    // Fetch the booked appointments for the specific patient and their receptionist
    const appointments = await BookedAppointment.find({
      patient_id: patientObjectId,
      // Add the condition to filter by receptionist_id
      receptionist_id: { $exists: true },
    });

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

// approving appointments
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

    const receptionist = await Receptionist.findOne({
      email: decryptedUser.user.email,
    });

    if (!receptionist) {
      return new Response(JSON.stringify({ error: "Receptionist not found" }), {
        status: 404,
      });
    }

    // update the approved status of the pending appointment for the specific patient to "approved"
    const updatedAppointment = await BookedAppointment.findOneAndUpdate(
      { approved: "pending", patient_id },
      { $set: { approved: "approved", receptionist_id: receptionist._id } },
      { new: true } // returns the updated document instead of the original document
    );

    // check if any document was updated
    if (!updatedAppointment) {
      return new Response(
        JSON.stringify({
          error: "Something went wrong while approving the appointment.",
        }),
        { status: 400 }
      );
    }

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
