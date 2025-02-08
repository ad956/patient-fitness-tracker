"use server";

import Admin from "@models/admin";
import { dbConfig, hashPassword } from "@utils/index";
import { NewAdminTemplate, sendEmail } from "@lib/emails";
import { render } from "@react-email/render";
import { getSession } from "@lib/session";

// : Formdata
export default async function addAdmin(formData: any): Promise<any> {
  try {
    const session = await getSession();
    const { id, role } = session || {};

    if (!id || !role) {
      throw new Error("Missing user ID or role in session");
    }

    await dbConfig();

    const { firstname, lastname, email, password } = Object.fromEntries(
      formData.entries()
    );

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new Error("Admin already exists");
    }

    // Generate a unique username
    let username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
    let usernameSuffix = 0;
    while (await Admin.findOne({ username })) {
      usernameSuffix++;
      username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}${usernameSuffix}`;
    }

    // Hash password
    const hashedPassword = await hashPassword(password as string);

    // Create new admin
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
        "https://res.cloudinary.com/doahnjt5z/image/upload/v1736261729/assets/xeqy76eccywusabkdkjc.png",
      address: {
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
      },
    });

    await newAdmin.save();

    // Send welcome email
    const mailSent = await sendEmail({
      to: email as string,
      subject: "Welcome to Syncure - Admin Account Created",
      html: render(
        NewAdminTemplate({
          firstname,
          lastname,
          email,
          username,
          password: password as string,
        })
      ),
      from: {
        name: "Syncure",
        address: "support@patientfitnesstracker.com",
      },
    });

    if (!mailSent) {
      console.error("Failed to send welcome email to new admin");
    }

    return {
      success: true,
      message: "Admin added successfully",
    };
  } catch (error: any) {
    console.error("Error adding admin:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}
