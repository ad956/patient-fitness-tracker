import dbConfig from "@/app/lib/db";
import { OtpTemplate } from "@/app/lib/emails/templates";
import { sendEmail } from "@/app/lib/email";
import { render } from "@react-email/render";
import { generateSecureOTP } from "@utils/generateOtp";
import {
  doctoradditionalDetails,
  hospitaladditionalDetails,
  patientadditionalDetails,
  receptionistadditionalDetails,
} from "@constants/index";
import bcrypt from "bcrypt";
import { Patient } from "@/app/models/Patient";

type SignupBody = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

const allowedRoles = ["patient", "hospital", "doctor", "receptionist"];

export async function POST(req: Request) {
  try {
    const body: SignupBody = await req.json();

    if (checkMissingElements(body)) {
      return Response.json(
        { error: "Missing required fields in the request body" },
        { status: 400 }
      );
    }

    if (!allowedRoles.includes(body.role)) {
      return Response.json({ error: "User role isn't valid." });
    }

    const result = await createAccount(body);
    return result;
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

  const hashedPassword = await hashPassword(signupBody.password);

  const user = {
    ...signupBody,
    ...additionalDetails,
    password: hashedPassword,
  };

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
    html: render(OtpTemplate(send.name, send.otp)),
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

async function hashPassword(password: string) {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"); // Read salt rounds from environment variable or default to "10"
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function getUserModel(email: string, role: string) {
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
    case "hospital":
      return await Hospital.findOne({ email }, projection);
    case "receptionist":
      return await Receptionist.findOne({ email }, projection);
    default:
      return null;
  }
}
