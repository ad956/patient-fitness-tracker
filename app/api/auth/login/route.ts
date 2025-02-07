import { NextResponse } from "next/server";
import { OtpTemplate, sendEmail } from "@lib/emails";
import { render } from "@react-email/render";
import {
  dbConfig,
  errorHandler,
  generateSecureOTP,
  getModelByRole,
  STATUS_CODES,
  allowedRoles,
} from "@utils/index";
import bcrypt from "bcrypt";

type LoginBody = {
  usernameOrEmail: string;
  password: string;
  role: string;
};

export async function POST(req: Request) {
  const body: LoginBody = await req.json();

  if (!body || !body.usernameOrEmail || !body.password || !body.role) {
    return errorHandler(
      "Invalid request body. Please provide username or email, password, and role.",
      STATUS_CODES.BAD_REQUEST
    );
  }

  if (!allowedRoles.includes(body.role)) {
    return errorHandler("User role isn't valid.", STATUS_CODES.BAD_REQUEST);
  }

  try {
    const result = await setOTP(body);
    return result;
  } catch (error: any) {
    console.error("Error during login: ", error);
    return errorHandler("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}

async function setOTP(loginBody: LoginBody) {
  await dbConfig();

  const UserModel = getModelByRole(loginBody.role);

  const user = await UserModel.findOne(
    {
      $or: [
        { email: loginBody.usernameOrEmail },
        { username: loginBody.usernameOrEmail },
      ],
    },
    { _id: 1, email: 1, firstname: 1, lastname: 1, password: 1 }
  );

  if (!user || !(await bcrypt.compare(loginBody.password, user.password))) {
    return errorHandler(
      "Invalid username/email or password",
      STATUS_CODES.UNAUTHORIZED
    );
  }

  const generatedOTP = generateSecureOTP();
  user.otp = generatedOTP;
  await user.save();

  const mailSent = await sendEmail({
    to: user.email,
    subject: "OTP Verification",
    html: render(OtpTemplate(user.firstname, generatedOTP)),
    from: {
      name: "Syncure",
      address: "support@patientfitnesstracker.com",
    },
  });

  if (!mailSent) {
    return errorHandler("Email Sending Failed", STATUS_CODES.SERVER_ERROR);
  }

  return NextResponse.json({ message: "ok" }, { status: 201 });
}
