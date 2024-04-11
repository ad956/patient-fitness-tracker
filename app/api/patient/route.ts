import dbConfig from "@/lib/db";
import { getSession } from "@sessions/sessionUtils";

export async function GET() {
  const userSession = await getSession();
  console.log("p sess :" + userSession);

  if (!userSession)
    return Response.json(
      { error: "Patient session not found" },
      { status: 401 }
    );

  const email = userSession?.user.email;

  try {
    const db = await dbConfig();
    const collection = db.collection("patient");

    const projection = {
      _id: 0,
      firstname: 1,
      lastname: 1,
      username: 1,
      email: 1,
      contact: 1,
      profile: 1,
      "physicalDetails.age": 1,
      "physicalDetails.blood": 1,
      "physicalDetails.height": 1,
      "physicalDetails.weight": 1,
      "progress.generalHealth": 1,
      "progress.waterBalance": 1,
      "progress.currentTreatment": 1,
      "progress.pendingAppointments": 1,
      activity: 1,
      healthConditions: 1,
    };

    const patientData = await collection.findOne({ email }, { projection });

    if (!patientData) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    return Response.json({ patient: patientData });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
