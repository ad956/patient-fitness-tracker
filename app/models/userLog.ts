import mongoose from "mongoose";

export interface UserLog extends mongoose.Document {
  username: string;
  name: string;
  email: string;
  action: string;
  userType: string;
  timing: string;
  device: string;
  ip: string;
  location: string;
}

const userLogSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    action: { type: String, required: true },
    userType: { type: String, required: true },
    timing: { type: Date, required: true },
    device: { type: String, required: true },
    ip: { type: String, required: true },
    location: String,
  },
  {
    collection: "user_logs",
  }
);

export default mongoose.models.UserLog ||
  mongoose.model<UserLog>("UserLog", userLogSchema);
