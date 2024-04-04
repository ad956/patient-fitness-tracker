// import cookies from "js-cookie";
// export function checkSession() {
//   const session = cookies.get("session");
//   return session ? JSON.parse(session) : null;
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import { render } from "@react-email/render";
// import WelcomeTemplate from "@/emails/otpmail";
// import { sendEmail } from "../../../lib/email";

// interface sendType {
//   to: string;
//   subject: string;
//   otp: string;
//   name: string;
// }

// export default async function Messenger(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   send: sendType
// ) {

//   return res.status(200).json({ message: "Email sent successfully" });
// }
