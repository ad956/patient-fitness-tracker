import { OtpTemplate } from "@lib/emails/templates";
import sendEmail from "@lib/sendemail";
import { render } from "@react-email/render";
import {
  allowedRoles,
  doctoradditionalDetails,
  hospitaladditionalDetails,
  patientadditionalDetails,
  receptionistadditionalDetails,
} from "@constants/index";
import {
  dbConfig,
  generateSecureOTP,
  getModelByRole,
  hashPassword,
} from "@utils/index";

type SignupBody = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  password: string;
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

  const UserModel = getModelByRole(signupBody.role);

  const existingUser = await UserModel.findOne({
    $or: [{ email: signupBody.email }, { username: signupBody.username }],
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

  // gets the additional details based on the user's role
  let additionalDetails = getAdditionalDetails(signupBody.role);

  const hashedPassword = await hashPassword(signupBody.password);

  const newUser = new UserModel({
    ...signupBody,
    password: hashedPassword,
    ...additionalDetails,
  });

  const savedUser = await newUser.save();

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
  return requiredFields.some((field) => !(field in body));
}

// returns additional details based on the user's role
function getAdditionalDetails(role: string) {
  switch (role) {
    case "patient":
      return patientadditionalDetails;
    case "receptionist":
      return receptionistadditionalDetails;
    case "doctor":
      return doctoradditionalDetails;
    case "hospital":
      return hospitaladditionalDetails;
  }
}
