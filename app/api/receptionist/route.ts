import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import Receptionist from "@models/receptionist";

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

    const projection = {
      _id: 1,
      firstname: 1,
      lastname: 1,
      username: 1,
      email: 1,
      contact: 1,
      profile: 1,
      dob: 1,
      dailyCount: 1,
    };

    const receptionistData = await Receptionist.findOne(
      { email },
      { projection }
    );

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
