import crypto from "crypto";

export function generateOTP() {
  const otp = Math.floor(10000 + Math.random() * 90000);
  return otp.toString();
}

export function generateSecureOTP() {
  const buffer = crypto.randomBytes(2);
  const otp = buffer.readUInt16BE(0);
  return otp.toString().padStart(5, "0");
}
