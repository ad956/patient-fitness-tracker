import dbConfig from "@utils/db";
import Doctor from "@models/doctor";
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

    const doctor_id = new Types.ObjectId(id);

    await dbConfig();

    // const projection = {}; { projection }

    const doctorData = await Doctor.findById(doctor_id);

    if (!doctorData) {
      return Response.json({ error: "Doctor not found" }, { status: 404 });
    }

    return Response.json(doctorData);
  } catch (error) {
    console.error("Error fetching Doctor data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
