import dbConfig from "@utils/db";
import Patient from "@models/patient";
import { Types } from "mongoose";

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

    const patient_id = new Types.ObjectId(id);

    await dbConfig();

    const projection = {
      role: 0,
      otp: 0,
      password: 0,
      current_hospital: 0,
    };

    const patientData = await Patient.findById(patient_id, { projection });

    if (!patientData) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    return Response.json(patientData);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
