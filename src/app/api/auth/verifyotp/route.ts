import { setSession } from "@/app/lib/sessions/sessionUtils";
import dbConfig from "@/app/lib/db";
import logUserActivity from "@/app/lib/logs";

type bodyType = {
  email: string;
  otp: string;
  role: string;
  action: string;
};

const allowedRoles = ["patient", "hospital", "doctor", "receptionist"];

export async function POST(req: Request) {
  try {
    const body: bodyType = await req.json();

    if (!body || !body.email || !body.role || !body.action || !body.otp) {
      return Response.json({
        error: "Email, OTP, and role are required fields in the request body.",
      });
    }

    if (!allowedRoles.includes(body.role)) {
      return Response.json({ error: "User role isn't valid." });
    }

    const result = await checkOTP(body, req);
    return result;
  } catch (error) {
    console.error("Error during otp verification:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
async function checkOTP(body: bodyType, req: Request) {
  const db = await dbConfig();

  const collection = db.collection(body.role);
  const email = body.email;

  const projection = {
    _id: 0,
    username: 1,
    firstname: 1,
    lastname: 1,
    otp: 1,
  };

  const user = await collection.findOne({ email }, { projection });

  if (!user || user.otp !== body.otp)
    return Response.json({ error: "OTP Verification Failed" });

  await collection.updateOne({ email }, { $set: { otp: "" } });

  // setting session for user (stores jwt token in cookies named session)
  await setSession(email, body.role);

  const userlog = {
    username: user.username,
    name: `${user.firstname} ${user.lastname}`,
    email,
    role: body.role,
    action: body.action,
  };

  // storing user logs in db
  await logUserActivity(userlog, req);

  return Response.json({ message: "ok" }, { status: 200 });
}
