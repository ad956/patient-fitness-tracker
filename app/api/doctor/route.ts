import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import Doctor from "@models/doctor";

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

    const doctorData = await Doctor.findOne({ email });

    if (!doctorData) {
      return Response.json({ error: "Doctor not found" }, { status: 404 });
    }

    return Response.json(doctorData);
  } catch (error) {
    console.error("Error fetching Doctor data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
