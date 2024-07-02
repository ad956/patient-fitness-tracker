import dbConfig from "@/app/utils/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    if (!email) {
      return new Response("Email parameter is missing", {
        status: 400,
      });
    }

    const db = await dbConfig();
    const doctor_collection = db.collection("doctor");
    const doctor = await doctor_collection.findOne({ email });

    if (!doctor) {
      return new Response(JSON.stringify({ error: "doctor not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(doctor), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting appointments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
