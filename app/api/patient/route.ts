import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import Patient from "@models/patient";

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
      role: 0,
      otp: 0,
      password: 0,
      current_hospital: 0,
    };

    const patientData = await Patient.findOne({ email }, { projection });

    if (!patientData) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    return Response.json(patientData);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
