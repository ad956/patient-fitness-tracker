import { NextResponse } from "next/server";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import CityStateHospital from "@models/city-state-hospitals";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const state = searchParams.get("state");
  const city = searchParams.get("city");

  try {
    if (!state || !city) {
      return errorHandler(
        "State or city parameter is missing",
        STATUS_CODES.BAD_REQUEST
      );
    }

    await dbConfig();

    const stateHospitals = await CityStateHospital.findOne({
      [state]: { $exists: true },
    });

    if (!stateHospitals) {
      return errorHandler(
        "No hospitals found for the specified state",
        STATUS_CODES.NOT_FOUND
      );
    }

    const cityHospitals = stateHospitals.get(state)[city];

    if (!cityHospitals) {
      return errorHandler(
        "No hospitals found in the specified city",
        STATUS_CODES.NOT_FOUND
      );
    }

    return NextResponse.json(cityHospitals, { status: 200 });
  } catch (error) {
    console.error(
      "Error while fetching hospitals for booking appointments: ",
      error
    );
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}
