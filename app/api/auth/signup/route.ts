import dbConfig from "@/lib/db";
import WelcomeTemplate from "@/emails/otpmail";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import { generateSecureOTP } from "@/app/utils/generateOtp";
import {
  doctoradditionalDetails,
  hospitaladditionalDetails,
  patientadditionalDetails,
  receptionistadditionalDetails,
} from "@constants/index";

type SignupBody = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

export async function POST(req: Request) {
  try {
    const body: SignupBody = await req.json();

    if (checkMissingElements(body)) {
      return Response.json(
        { error: "Missing required fields in the request body" },
        { status: 400 }
      );
    }

    switch (body.role) {
      case "patient":
        return createAccount(body);
      case "hospital":
        return createAccount(body);
      case "doctor":
        return createAccount(body);
      case "receptionist":
        return createAccount(body);

      default:
        return Response.json({
          error: "Error creating account. Invalid user role!",
        });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}

async function createAccount(signupBody: SignupBody) {
  const db = await dbConfig();

  const collection = db.collection(signupBody.role);
  const email = signupBody.email;
  const username = signupBody.username;
  const existingUser = await collection.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === signupBody.email) {
      return Response.json({ error: "Email already exists" }, { status: 409 });
    }

    if (existingUser.username === signupBody.username) {
      return Response.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }
  }

  let additionalDetails;

  switch (signupBody.role) {
    case "patient":
      additionalDetails = patientadditionalDetails;
      break;
    case "hospital":
      additionalDetails = hospitaladditionalDetails;
      break;
    case "doctor":
      additionalDetails = doctoradditionalDetails;
      break;
    case "receptionist":
      additionalDetails = receptionistadditionalDetails;
      break;
  }

  const user = { ...signupBody, ...additionalDetails };

  await collection.insertOne(user);

  const generatedOTP = generateSecureOTP();
  await collection.updateOne({ email }, { $set: { otp: generatedOTP } });

  const send = {
    to: user.email,
    subject: "Verification of OTP for Account Creation",
    otp: generatedOTP,
    name: user.firstname,
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

  if (!mailsent) return Response.json({ error: "Signup email sending failed" });
  return Response.json(
    { message: "Account created successfully" },
    { status: 201 }
  );
}

function checkMissingElements(body: SignupBody) {
  const requiredFields = [
    "firstname",
    "lastname",
    "username",
    "email",
    "password",
    "role",
  ];
  for (const field of requiredFields) {
    if (!body.hasOwnProperty(field)) {
      return true;
    }
  }
  return false;
}
