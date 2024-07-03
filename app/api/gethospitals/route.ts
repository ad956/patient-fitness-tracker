import CityStateHospital from "@models/citystate_hospitals";
import dbConfig from "@utils/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const state = searchParams.get("state");
  const city = searchParams.get("city");
  try {
    if (!state || !city) {
      return new Response("State or city parameter is missing", {
        status: 400,
      });
    }

    await dbConfig();

    const stateHospitals = await CityStateHospital.findOne({
      [state]: { $exists: true },
    });

    if (!stateHospitals) {
      return new Response("No hospitals found for the specified state", {
        status: 404,
      });
    }

    const cityHospitals = stateHospitals.get(state)[city];

    if (!cityHospitals) {
      return new Response("No hospitals found in the specified city", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(cityHospitals), { status: 200 });
  } catch (error) {
    console.error(
      "Error while fetching hospitals for booking appointments : ",
      error
    );
    return new Response("Internal Server Error", { status: 500 });
  }
}
