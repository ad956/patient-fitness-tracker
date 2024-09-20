import dbConfig from "@utils/db";
import Hospital from "@models/hospital";
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

    const hospital_id = new Types.ObjectId(id);

    await dbConfig();

    // const projection = {}; { projection }

    const hospitalData = await Hospital.findById(hospital_id);

    if (!hospitalData) {
      return Response.json({ error: "Hospital not found" }, { status: 404 });
    }

    return Response.json(hospitalData);
  } catch (error) {
    console.error("Error fetching Hospital data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
