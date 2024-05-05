import dbConfig from "@lib/db";
import WelcomeTemplate from "@/emails/otpmail";
import { sendEmail } from "@lib/email";
import { render } from "@react-email/render";
import { generateSecureOTP } from "@utils/generateOtp";

type LoginBody = {
  email: string;
  password: string;
  role: string;
};

export async function POST(req: Request) {
  try {
    const body: LoginBody = await req.json();

    switch (body.role) {
      case "patient":
        return setOTP(body);
      case "hospital":
        return setOTP(body);
      case "doctor":
        return setOTP(body);
      case "receptionist":
        return setOTP(body);

      default:
        return Response.json({ error: "Invalid user" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}

async function setOTP(loginBody: LoginBody) {
  const db = await dbConfig();

  const collection = db.collection(loginBody.role);
  const email = loginBody.email;
  const user = await collection.findOne({ email });

  if (!user || user.password !== loginBody.password) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const generatedOTP = generateSecureOTP();
  await collection.updateOne({ email }, { $set: { otp: generatedOTP } });

  const send = {
    to: user.email,
    subject: "OTP Verification",
    otp: generatedOTP,
    name: user.name,
  };

  const mailsent = await sendEmail({
    to: send.to,
    subject: send.subject,
    html: render(WelcomeTemplate(send.name, send.otp)),
    from: {
      name: "Patient Fitness Tracker",
      address: "support@patientfitnesstracker.com",
    },
  });

  if (!mailsent) return Response.json({ error: "Email Sending Failed" });
  return Response.json({ message: "ok" }, { status: 201 });
}
