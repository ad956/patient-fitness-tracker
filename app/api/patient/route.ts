import dbConfig from "@/lib/db";

export async function GET() {
  try {
    const db = await dbConfig();
    const collection = db.collection("patient");

    const projection = {
      _id: 0,
      id: 1,
      name: 1,
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
      upcomingAppointments: 1,
    };

    const patientData = await collection.findOne({ id: 1 }, { projection });

    if (!patientData) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    return Response.json({ patient: patientData });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
