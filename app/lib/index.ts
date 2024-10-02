import authenticateUser from "./auth/authenticateUser";
import sendEmail from "./sendemail";
import sendNotification from "./novu";
import verifyOtp from "./verifyOtp";

export * from "./emails/templates";
export { authenticateUser, sendEmail, sendNotification, verifyOtp };
