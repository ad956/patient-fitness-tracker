import dbConfig from "@utils/db";
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
import { Patient, Receptionist, Doctor, Hospital } from "@models/index";

type SignupBody = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  password: string;
};

const allowedRoles = ["patient", "receptionist", "doctor", "hospital"];

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
  await dbConfig();

  // retrieves the existing user
  const existingUser = await getExistingUser(
    signupBody.email,
    signupBody.username,
    signupBody.role
  );

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

  // gets the additional details based on the user's role
  let additionalDetails = getAdditionalDetails(signupBody.role);

  const hashedPassword = await hashPassword(signupBody.password);

  const newUser = {
    ...signupBody,
    password: hashedPassword,
    ...additionalDetails,
  };

  const savedUser = await saveUserModel(newUser, signupBody.role);

  const generatedOTP = generateSecureOTP();

  await savedUser.updateOne(
    { email: savedUser.email },
    { $set: { otp: generatedOTP } }
  );

  const mailsent = await sendEmail({
    to: savedUser.email,
    subject: "Verification of OTP for Account Creation",
    html: render(OtpTemplate(savedUser.firstname, generatedOTP)),
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

// checks for missing elements in body
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

// returns additional details based on the user's role
export async function getAdditionalDetails(role: string) {
  let additionalDetails;

  switch (role) {
    case "patient":
      additionalDetails = patientadditionalDetails;
      break;
    case "receptionist":
      additionalDetails = receptionistadditionalDetails;
      break;
    case "doctor":
      additionalDetails = doctoradditionalDetails;
      break;
    case "hospital":
      additionalDetails = hospitaladditionalDetails;
      break;
    default:
      additionalDetails = null;
  }

  return additionalDetails;
}

// hashing the password
async function hashPassword(password: string) {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// saves a new user to the database based on their role
export async function saveUserModel(newUser: any, role: string) {
  let savedUser;
  switch (role) {
    case "patient":
      savedUser = await new Patient(newUser).save();
      return savedUser;
    case "receptionist":
      savedUser = await new Receptionist(newUser).save();
      return savedUser;
    case "doctor":
      savedUser = await new Doctor(newUser).save();
      return savedUser;
    case "hospital":
      savedUser = await new Hospital(newUser).save();
      return savedUser;
    default:
      return null;
  }
}

// retrieves existing user based on the provided email and role
export async function getExistingUser(
  email: string,
  username: string,
  role: string
) {
  const projection = {
    _id: 0,
    email: 1,
    firstname: 1,
    lastname: 1,
    password: 1,
  };

  let existingUser;
  switch (role) {
    case "patient":
      existingUser = await Patient.findOne(
        {
          $or: [{ email }, { username }],
        },
        projection
      );
      return existingUser;
    case "receptionist":
      existingUser = await Receptionist.findOne(
        {
          $or: [{ email }, { username }],
        },
        projection
      );
      return existingUser;
    case "doctor":
      existingUser = await Doctor.findOne(
        {
          $or: [{ email }, { username }],
        },
        projection
      );
      return existingUser;
    case "hospital":
      existingUser = await Hospital.findOne(
        {
          $or: [{ email }, { username }],
        },
        projection
      );
      return existingUser;
    default:
      return null;
  }
}
