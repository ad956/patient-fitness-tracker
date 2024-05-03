import dbConfig from "@/lib/db";
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
    const collection = db.collection("receptionist");

    const projection = {
      _id: 0,
      firstname: 1,
      lastname: 1,
      username: 1,
      email: 1,
      contact: 1,
      profile: 1,
      dob: 1,
      dailyCount: 1,
    };

    const receptionistData = await collection.findOne(
      { email },
      { projection }
    );

    if (!receptionistData) {
      return Response.json(
        { error: "receptionist not found" },
        { status: 404 }
      );
    }

    return Response.json({ receptionist: receptionistData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching receptionist data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
