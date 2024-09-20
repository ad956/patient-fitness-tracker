import dbConfig from "@utils/db";
import Admin from "@models/admin";
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

    const admin_id = new Types.ObjectId(id);

    await dbConfig();

    // const projection = {}; { projection }

    const adminData = await Admin.findById(admin_id);

    if (!adminData) {
      return Response.json({ error: "Admin not found" }, { status: 404 });
    }

    return Response.json(adminData);
  } catch (error) {
    console.error("Error fetching Admin data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
