import dbConfig from "@/app/utils/db";

export async function GET() {
  try {
    const db = await dbConfig();
    const collection = db.collection("commonDiseases");

    const result = await collection.findOne();

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
