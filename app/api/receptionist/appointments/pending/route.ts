import dbConfig from "@/lib/db";
import { decryptSessionToken } from "@sessions/sessionUtils";

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = session.split("Bearer ")[1];

    const decryptedUser = await decryptSessionToken(token);

    const email = decryptedUser.user.email;

    const db = await dbConfig();
    const collection = db.collection("receptionist");

    const projection = {
      _id: 0,
      current_hospital: 1,
    };

    const current_hospital = await collection.findOne(
      { email },
      { projection }
    );

    if (!current_hospital) {
      return Response.json(
        { error: "receptionist hospital isn't selected" },
        { status: 404 }
      );
    }

    return Response.json({ receptionist: current_hospital }, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending appointments data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
