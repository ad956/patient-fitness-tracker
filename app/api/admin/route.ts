import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import Admin from "@models/admin";

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    await dbConfig();

    // const projection = {}; { projection }

    const adminData = await Admin.findOne({ email });

    if (!adminData) {
      return Response.json({ error: "Admin not found" }, { status: 404 });
    }

    return Response.json(adminData);
  } catch (error) {
    console.error("Error fetching Admin data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
