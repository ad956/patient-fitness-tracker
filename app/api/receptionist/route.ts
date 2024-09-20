import dbConfig from "@utils/db";
import Receptionist from "@models/receptionist";
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

    const receptionist_id = new Types.ObjectId(id);

    await dbConfig();

    const projection = {
      role: 0,
      otp: 0,
      password: 0,
      current_hospital: 0,
    };

    const receptionistData = await Receptionist.findById(receptionist_id, {
      projection,
    });
    if (!receptionistData) {
      return Response.json(
        { error: "receptionist not found" },
        { status: 404 }
      );
    }

    return Response.json(receptionistData, { status: 200 });
  } catch (error) {
    console.error("Error fetching receptionist data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
