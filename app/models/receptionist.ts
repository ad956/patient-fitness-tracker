import mongoose from "mongoose";

export interface Receptionist extends mongoose.Document {
  firstname: { type: String; required: true };
  lastname: { type: String; required: true };
  username: { type: String; required: true; unique: true };
  email: { type: String; required: true; unique: true };
  password: { type: String; required: true };
  role: { type: String; required: true; default: "patient" };
  otp: String;
  dob: { type: Date; required: false };
  gender: {
    type: String;
    required: false;
    enum: ["Male", "Female", "Other"];
  };
  contact: { type: String; required: false };
  profile: String;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  };
  current_hospital: mongoose.Schema.Types.ObjectId;
  dailyCount: {
    approved: Number;
    pending: Number;
    waiting: Number;
  };
}

const receptionistSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "receptionist" },
    otp: String,
    dob: { type: Date, required: false },
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
    current_hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    dailyCount: {
      approved: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      waiting: { type: Number, default: 0 },
    },
  },
  { collection: "receptionist" }
);

export default mongoose.models.Receptionist ||
  mongoose.model<Receptionist>("Receptionist", receptionistSchema);
