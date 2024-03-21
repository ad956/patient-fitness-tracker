import dbConfig from "@/lib/db";

export async function GET() {
  try {
    const db = await dbConfig();
    const collection = db.collection("patient");

    const projection = { _id: 0, medicalhistory: 1 };
    const patient = await collection.findOne({ id: 1 }, { projection });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    // Extract hospitals data from patient
    const hospitalsData = patient.medicalhistory;

    return Response.json(hospitalsData);
  } catch (error) {
    console.error("Error fetching hospital data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
