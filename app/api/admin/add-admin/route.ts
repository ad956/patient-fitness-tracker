import dbConfig from "@utils/db";
import Admin from "@models/admin";
import hashPassword from "@utils/hashPassword";
import { NewAdminTemplate } from "@lib/emails/templates";
import { render } from "@react-email/render";
import sendEmail from "@lib/sendemail";

export async function POST(request: Request) {
  try {
    const id = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    await dbConfig();

    const formData = await request.json();
    const { firstname, lastname, email, password } = formData;

    // check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return Response.json({ error: "Admin already exists" }, { status: 409 });
    }

    // generate a username
    let username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
    let usernameSuffix = 0;
    let usernameExists = true;

    while (usernameExists) {
      const existingUser = await Admin.findOne({ username });
      if (!existingUser) {
        usernameExists = false;
      } else {
        usernameSuffix++;
        username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}${usernameSuffix}`;
      }
    }

    // hashing password
    const hashedPassword = await hashPassword(password);

    // new admin
    const newAdmin = new Admin({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role: "admin",
      otp: "",
      dob: "1970-01-01",
      gender: "Male",
      contact: "",
      profile:
        "https://res.cloudinary.com/dtkfvp2ic/image/upload/v1715082439/110505291-heart-shape-illustration-health-medicine-concept-people-running-for-exercise-awareness-or-sport_eyu2iw.jpg",
      address: {
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
      },
    });

    // save new admin
    await newAdmin.save();

    const mailsent = await sendEmail({
      to: email,
      subject: "Welcome to Patient Fitness Tracker - Admin Account Created",
      html: render(
        NewAdminTemplate({
          firstname,
          lastname,
          email,
          username,
          password: password,
        })
      ),
      from: {
        name: "Patient Fitness Tracker",
        address: "support@patientfitnesstracker.com",
      },
    });

    if (!mailsent) {
      console.error("Failed to send welcome email to new admin");
    }

    return Response.json(
      {
        success: true,
        message: "Admin added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding admin:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
