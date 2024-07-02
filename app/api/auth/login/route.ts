import dbConfig from "@utils/db";
import { OtpTemplate } from "@lib/emails/templates";
import sendEmail from "@lib/sendemail";
import { render } from "@react-email/render";
import { generateSecureOTP } from "@utils/generateOtp";
import bcrypt from "bcrypt";
import { Patient, Receptionist, Doctor, Hospital } from "@models/index";

type LoginBody = {
  email: string;
  password: string;
  role: string;
};

const allowedRoles = ["patient", "receptionist", "doctor", "hospital"];

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

  const user = await getUserModel(loginBody.email, loginBody.role);

  if (!user || !(await bcrypt.compare(loginBody.password, user.password))) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const generatedOTP = generateSecureOTP();
  await user.updateOne(
    { email: loginBody.email },
    { $set: { otp: generatedOTP } }
  );

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

// retrieves a user from the database based on email and role
async function getUserModel(email: string, role: string) {
  const projection = {
    _id: 0,
    email: 1,
    firstname: 1,
    lastname: 1,
    password: 1,
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
