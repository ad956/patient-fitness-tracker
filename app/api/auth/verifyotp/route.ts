import { setSession } from "@sessions/sessionUtils";
import { dbConfig, getModelByRole } from "@utils/index";
import { allowedRoles } from "@constants/index";
import logUserActivity from "@lib/logs";

type bodyType = {
  usernameOrEmail: string;
  otp: string;
  role: string;
  action: string;
};

export async function POST(req: Request) {
  try {
    const body: bodyType = await req.json();

    if (
      !body ||
      !body.usernameOrEmail ||
      !body.role ||
      !body.action ||
      !body.otp
    ) {
      return Response.json(
        {
          error:
            "Username/Email, OTP, action and role are required fields in the request body.",
        },
        { status: 400 }
      );
    }

    if (!allowedRoles.includes(body.role)) {
      return Response.json(
        { error: "User role isn't valid." },
        { status: 400 }
      );
    }

    const result = await checkOTP(body, req);
    return result;
  } catch (error) {
    console.error("Error during otp verification:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
async function checkOTP(body: bodyType, req: Request) {
  await dbConfig();

  const UserModel = getModelByRole(body.role);

  const user = await UserModel.findOne(
    {
      $or: [
        { email: body.usernameOrEmail },
        { username: body.usernameOrEmail },
      ],
    },
    { _id: 0, username: 1, firstname: 1, lastname: 1, otp: 1, email: 1 }
  );

  if (!user || user.otp !== body.otp)
    return Response.json({ error: "OTP Verification Failed" }, { status: 401 });

  await UserModel.updateOne({ email: user.email }, { $set: { otp: "" } });

  // setting session for user (stores jwt token in cookie named session)
  await setSession(user.email, body.role);

  const userlog = {
    username: user.username,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
    role: body.role,
    action: body.action,
  };

  // storing user logs in db
  await logUserActivity(userlog, req);

  return Response.json({ message: "ok" }, { status: 200 });
}
