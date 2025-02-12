import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@lib/auth";
import Admin from "@models/admin";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { Types } from "mongoose";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const { id, role } = await authenticateUser();

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const admin_id = new Types.ObjectId(id);
    await dbConfig();

    const adminData = await Admin.findById(admin_id);

    if (!adminData) {
      return errorHandler("Admin not found", STATUS_CODES.NOT_FOUND);
    }

    return NextResponse.json(adminData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Admin data route:", error);
    return errorHandler(error, STATUS_CODES.SERVER_ERROR);
  }
}
