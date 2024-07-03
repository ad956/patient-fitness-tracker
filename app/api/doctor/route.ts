import dbConfig from "@utils/db";
import Doctor from "@models/doctor";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    if (!email) {
      return new Response("Email parameter is missing", {
        status: 400,
      });
    }

    await dbConfig();

    const doctor = await Doctor.findOne({ email });

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
