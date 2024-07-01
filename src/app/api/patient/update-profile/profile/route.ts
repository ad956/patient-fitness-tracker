import dbConfig from "@/app/lib/db";
import { decrypt } from "@/app/lib/sessions/sessionUtils";

export async function PUT(request: Request) {
  //   const session = request.headers.get("Authorization");
  //   if (!session) {
  //     return Response.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  const profile_pic = await request.json();

  try {
    // const token = session.split("Bearer ")[1];
    // const decryptedUser = await decrypt(token);
    const patient_email = "anandsuthar956@gmail.com"; //decryptedUser.user.email;

    const db = await dbConfig();
    const collection = db.collection("patient");

    const result = await collection.updateOne(
      { email: patient_email },
      { $set: { profile: profile_pic } }
    );

    if (!result) {
      return Response.json({ error: "Error updating profile picture" });
    }

    return Response.json({ msg: "ok" });
  } catch (error) {
    console.error("Error updating patient profile picture :", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
