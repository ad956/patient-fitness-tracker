import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import Hospital from "@models/hospital";

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

    const hospitalData = await Hospital.findOne({ email });

    if (!hospitalData) {
      return Response.json({ error: "Hospital not found" }, { status: 404 });
    }

    return Response.json(hospitalData);
  } catch (error) {
    console.error("Error fetching Hospital data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
