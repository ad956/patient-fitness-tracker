import dbConfig from "@utils/db";
import StateDocument from "@models/citystate_hospitals";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  try {
    if (!state) {
      return new Response("State parameter is missing", { status: 400 });
    }

    await dbConfig();
    const stateDocument = await StateDocument.findOne({
      [state]: { $exists: true },
    });

    if (!stateDocument) {
      return new Response("State not found", { status: 404 });
    }

    // Get the cities for the given state
    const cities = Object.keys(stateDocument.get(state));

    if (cities.length === 0) {
      return Response.json(cities, { status: 404 });
    }

    return Response.json(cities, { status: 201 });
  } catch (error) {
    console.error("Error fetching state and city data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
