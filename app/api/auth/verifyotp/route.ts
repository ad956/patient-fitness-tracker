import { setSession } from "@sessions/sessionUtils";
import dbConfig from "@lib/db";

type bodyType = {
  email: string;
  otp: string;
  role: string;
};

const allowedRoles = ["patient", "hospital", "doctor", "receptionist"];

export async function POST(req: Request) {
  try {
    const body: bodyType = await req.json();

    if (!body || !body.email || !body.role || !body.otp) {
      return Response.json({
        error: "Email, OTP, and role are required fields in the request body.",
      });
    }

    if (!allowedRoles.includes(body.role)) {
      return Response.json({ error: "User role isn't valid." });
    }

    const result = await checkOTP(body);
    return result;
  } catch (error) {
    console.error("Error during otp verification:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
async function checkOTP(body: bodyType) {
  const db = await dbConfig();

  const collection = db.collection(body.role);
  const email = body.email;

  const projection = {
    _id: 0,
    otp: 1,
  };

  const userOTP = await collection.findOne({ email }, { projection });

  if (!userOTP || userOTP.otp !== body.otp)
    return Response.json({ error: "OTP Verification Failed" });

  await collection.updateOne({ email }, { $set: { otp: "" } });

  // setting session for user (stores jwt token in cookies named session)
  await setSession(email, body.role);

  return Response.json({ message: "ok" }, { status: 200 });
}
