import mongoose from "mongoose";

export interface Admin extends mongoose.Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  otp: string;
  dob: string;
  gender: string;
  contact: string;
  profile: string;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  };
}

const adminSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "patient" },
    otp: String,
    dob: { type: String, required: false },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female", "Other"],
    },
    contact: { type: String, required: false },
    profile: String,
    address: {
      _id: false,
      address_line_1: String,
      address_line_2: String,
      city: String,
      state: String,
      country: String,
      zip_code: String,
    },
  },
  { collection: "admin", timestamps: true }
);

export default mongoose.models.Admin ||
  mongoose.model<Admin>("Admin", adminSchema);
