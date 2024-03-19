import data from "./data.json";

type HospitalData = {
  [state: string]: { [city: string]: string[] };
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const state = searchParams.get("state");
    const city = searchParams.get("city");

    if (!state || !city) {
      return new Response("State or city parameter is missing", {
        status: 400,
      });
    }

    const jsonData: HospitalData = data;

    if (!(state in jsonData)) {
      return new Response("State not found", { status: 404 });
    }

    const cities = jsonData[state];

    if (!cities.hasOwnProperty(city)) {
      return new Response("City not found", { status: 404 });
    }

    const hospitals = cities[city];

    return new Response(JSON.stringify({ hospitals }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching hospital data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
