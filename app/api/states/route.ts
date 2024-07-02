import dbConfig from "@utils/db";

export async function GET(req: Request) {
  try {
    const db = await dbConfig();
    const collection = db.collection("citystate_hospitals");

    const projection = { _id: 0 };
    const cursor = await collection.find({}, { projection });

    const states = await cursor.toArray();

    if (!states || states.length === 0) {
      return new Response("States not found", { status: 404 });
    }

    const stateNames = states.map((state) => Object.keys(state)[0]);

    return new Response(JSON.stringify(stateNames), { status: 200 });
  } catch (error) {
    console.error("Error fetching state data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
