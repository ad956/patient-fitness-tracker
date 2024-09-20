import dbConfig from "@utils/db";
import { BookedAppointment, Receptionist } from "@models/index";
import { Types } from "mongoose";

// get approved appointments
export async function GET(request: Request) {
  try {
    const id = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    const receptionist_id = new Types.ObjectId(id);

    const { searchParams } = new URL(request.url);
    const patient_id = searchParams.get("patient_id");

    if (!patient_id) {
      return Response.json(
        { error: "Patient id is required" },
        {
          status: 400,
        }
      );
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

    return Response.json(
      { appointments },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return Response.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}

// approving appointments
export async function POST(request: Request) {
  try {
    const { patient_id } = await request.json();

    const id = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    const receptionist_id = new Types.ObjectId(id);

    await dbConfig();

    const receptionist = await Receptionist.findById(receptionist_id);

    if (!receptionist) {
      return Response.json(
        { error: "Receptionist not found" },
        {
          status: 404,
        }
      );
    }

    // update the approved status of the pending appointment for the specific patient to "approved"
    const updatedAppointment = await BookedAppointment.findOneAndUpdate(
      { approved: "pending", patient_id },
      { $set: { approved: "approved", receptionist_id: receptionist._id } },
      { new: true } // returns the updated document instead of the original document
    );

    // check if any document was updated
    if (!updatedAppointment) {
      return Response.json(
        {
          error: "Something went wrong while approving the appointment.",
        },
        { status: 400 }
      );
    }

    return Response.json(
      { appointment: updatedAppointment },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating pending patient appointment:", error);
    return Response.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
