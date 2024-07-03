import CityStateHospital from "@models/citystate_hospitals";
import dbConfig from "@utils/db";

export async function GET(req: Request) {
  try {
    await dbConfig();

    const statesArray = await CityStateHospital.find({}, { _id: 0 });

    if (!statesArray || statesArray.length === 0) {
      return new Response("States not found", { status: 404 });
    }

    const stateNames = statesArray
      .flatMap((state) => Object.keys(state.toObject()))
      .filter((key) => key !== "cities");

    return new Response(JSON.stringify(stateNames), { status: 200 });
  } catch (error) {
    console.error("Error fetching state data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
