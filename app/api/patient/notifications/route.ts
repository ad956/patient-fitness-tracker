import dbConfig from "@lib/db";
import { decrypt } from "@sessions/sessionUtils";

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    const db = await dbConfig();
    const collection = db.collection("patient");

    const patient = await collection.findOne({ email });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    const notificationsData = patient.notifications;

    return Response.json(notificationsData);
  } catch (error) {
    console.error("Error fetching notifications data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
