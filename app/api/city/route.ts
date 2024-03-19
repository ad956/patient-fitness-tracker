import data from "./data.json";

type CityType = {
  [key: string]: string[];
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const state = searchParams.get("state");

    if (!state) {
      return new Response("State parameter is missing", { status: 400 });
    }

    const jsonData: CityType = data;

    if (!(state in jsonData)) {
      return new Response("State not found", { status: 404 });
    }

    const cities: string[] = jsonData[state];

    return new Response(JSON.stringify({ cities }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching state and city data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
