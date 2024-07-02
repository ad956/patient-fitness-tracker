import { setSession } from "@sessions/sessionUtils";
import dbConfig from "@utils/db";
import logUserActivity from "@lib/logs";
import { Doctor, Hospital, Patient, Receptionist } from "@models/index";

type bodyType = {
  email: string;
  otp: string;
  role: string;
  action: string;
};

const allowedRoles = ["patient", "receptionist", "doctor", "hospital"];

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
  await dbConfig();

  const user = await getUserModel(body.email, body.role);

  if (!user || user.otp !== body.otp)
    return Response.json({ error: "OTP Verification Failed" });

  await user.updateOne({ email: body.email }, { $set: { otp: "" } });

  // setting session for user (stores jwt token in cookie named session)
  await setSession(body.email, body.role);

  const userlog = {
    username: user.username,
    name: `${user.firstname} ${user.lastname}`,
    email: body.email,
    role: body.role,
    action: body.action,
  };

  // storing user logs in db
  await logUserActivity(userlog, req);

  return Response.json({ message: "ok" }, { status: 200 });
}
// retrieves a user from the database based on email and role
async function getUserModel(email: string, role: string) {
  const projection = {
    _id: 0,
    username: 1,
    firstname: 1,
    lastname: 1,
    otp: 1,
  };
  switch (role) {
    case "patient":
      return await Patient.findOne({ email }, projection);
    case "receptionist":
      return await Receptionist.findOne({ email }, projection);
    case "doctor":
      return await Doctor.findOne({ email }, projection);
    case "hospital":
      return await Hospital.findOne({ email }, projection);
    default:
      return null;
  }
}
