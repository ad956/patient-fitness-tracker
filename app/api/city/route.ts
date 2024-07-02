import dbConfig from "@utils/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  try {
    if (!state) {
      return new Response("State parameter is missing", { status: 400 });
    }

    const db = await dbConfig();
    const collection = db.collection("citystate_hospitals");

    const stateHospitals = await collection.findOne({
      [state]: { $exists: true },
    });

    if (!stateHospitals) {
      return new Response("State not found", { status: 404 });
    }

    const cities: string[] = Object.keys(stateHospitals[state]);

    if (!cities) {
      return Response.json(cities, { status: 404 });
    }

    return Response.json(cities, { status: 201 });
  } catch (error) {
    console.error("Error fetching state and city data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
