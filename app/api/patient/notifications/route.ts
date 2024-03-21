import dbConfig from "@/lib/db";

export async function GET() {
  try {
    const db = await dbConfig();
    const collection = db.collection("patient");

    const patient = await collection.findOne({ id: 1 });

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
