import dbConfig from "@/lib/db";
import { getSession } from "@sessions/sessionUtils";

export async function GET() {
  const userSession = await getSession();

  // console.log("session is  : " + userSession);

  if (!userSession)
    return Response.json(
      { error: "receptionist session not found" },
      { status: 401 }
    );

  const email = userSession?.user.email;
  console.log("email : " + email);

  try {
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

    return Response.json({ receptionistData }, { status: 200 });
    // return Response.json({ receptionist: receptionistData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching receptionist data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
