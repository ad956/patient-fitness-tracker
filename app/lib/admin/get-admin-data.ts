"use server";

import Admin from "@models/admin";
import { dbConfig } from "@utils/index";
import { Types } from "mongoose";
import authenticateUser from "../auth/authenticate-user";

export default async function getAdminData(): Promise<Admin> {
  try {
    const { id, role } = await authenticateUser();

    if (!id || !role) {
      throw new Error("Missing user ID or role in session");
    }

    const admin_id = new Types.ObjectId(id);
    await dbConfig();

    const adminData = await Admin.findById(admin_id).lean();

    if (!adminData) {
      throw new Error("Admin not found");
    }

    return JSON.parse(JSON.stringify(adminData));
  } catch (error: any) {
    console.error("An error occurred while fetching admin data:", error);
    throw error;
  }
}
