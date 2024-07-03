import CommonDiseases from "@models/commonDisease";
import dbConfig from "@utils/db";

export async function GET() {
  try {
    await dbConfig();

    const result = await CommonDiseases.findOne();

    if (!result) {
      return Response.json(
        { error: "error no common diseases found" },
        { status: 200 }
      );
    }

    const commonDiseases = result.commonDiseases;

    return Response.json(commonDiseases, { status: 200 });
  } catch (error) {
    console.error("Error while getting common diseases:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
