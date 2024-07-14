import { OtpTemplate } from "@lib/emails/templates";
import sendEmail from "@lib/sendemail";
import { render } from "@react-email/render";
import { dbConfig, generateSecureOTP, getModelByRole } from "@utils/index";
import { allowedRoles } from "@constants/index";
import bcrypt from "bcrypt";

type LoginBody = {
  email: string;
  password: string;
  role: string;
};

export async function POST(req: Request) {
  try {
    const body: LoginBody = await req.json();

    if (!body || !body.email || !body.password || !body.role) {
      return Response.json({
        error:
          "Invalid request body. Please provide email, password, and role.",
      });
    }

    if (!allowedRoles.includes(body.role)) {
      return Response.json({ error: "User role isn't valid." });
    }

    const result = await setOTP(body);
    return result;
  } catch (error) {
    console.error("Error during login:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}

async function setOTP(loginBody: LoginBody) {
  await dbConfig();

  const UserModel = getModelByRole(loginBody.role);

  const user = await UserModel.findOne(
    { email: loginBody.email },
    { _id: 1, email: 1, firstname: 1, lastname: 1, password: 1 }
  );

  if (!user || !(await bcrypt.compare(loginBody.password, user.password))) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const generatedOTP = generateSecureOTP();

  user.otp = generatedOTP;
  await user.save();

  const mailsent = await sendEmail({
    to: user.email,
    subject: "OTP Verification",
    html: render(OtpTemplate(user.firstname, generatedOTP)),
    from: {
      name: "Patient Fitness Tracker",
      address: "support@patientfitnesstracker.com",
    },
  });

  if (!mailsent) return Response.json({ error: "Email Sending Failed" });
  return Response.json({ message: "ok" }, { status: 201 });
}
