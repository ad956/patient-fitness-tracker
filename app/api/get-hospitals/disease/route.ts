import { NextResponse } from "next/server";
import CommonDiseases from "@models/common-disease";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";

export async function GET() {
  try {
    await dbConfig();

    const result = await CommonDiseases.findOne();

    if (!result) {
      return errorHandler(
        "error no common diseases found",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const commonDiseases = result.commonDiseases;

    return NextResponse.json(commonDiseases, { status: 200 });
  } catch (error) {
    console.error("Error while getting common diseases:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
