import dbConfig from "@utils/db";
import sendEmail from "../sendemail";
import { render } from "@react-email/render";
import { UserActivityTemplate } from "../emails/templates";
import { UserLog } from "@models/index";

type userlogType = {
  username: string;
  name: string;
  email: string;
  role: string;
  action: string;
};

async function logUserActivity(userlog: userlogType, req: Request) {
  await dbConfig();

  try {
    const user_log = {
      username: userlog.username,
      name: userlog.name,
      email: userlog.email,
      action: userlog.action,
      userType: userlog.role,
      device: req.headers.get("user-agent") || "",
      ip: (req.headers.get("x-forwarded-for") ?? "127.0.0.1")
        .split(",")[0]
        .trim(),
      location: await fetchLocationByIP(),
    };

    //stores in user_logs
    const logs = new UserLog(user_log);

    await logs.save();

    await sendEmail({
      to: process.env.LOGGER_EMAIL || "yourmail@example.com",
      subject: `Alert: User ${userlog.action} Activity Notification`,
      html: render(UserActivityTemplate(user_log)),
      from: {
        name: "Patient Fitness Tracker",
        address: "support@patientfitnesstracker.com",
      },
    });
  } catch (error: any) {
    console.error(`While logging user activities got an error : ${error.msg}`);
  }
}

async function fetchLocationByIP() {
  // No need to pass IP as it will be automatically detected by ipinfo.io
  const request = await fetch(
    `https://ipinfo.io/json?token=${process.env.IP_INFO_TOKEN}`
  );
  const jsonResponse = await request.json();
  const location = `${jsonResponse.city}, ${jsonResponse.region}, ${jsonResponse.country}`;
  return location;
}

export default logUserActivity;
