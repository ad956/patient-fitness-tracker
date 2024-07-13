import mongoose from "mongoose";

export interface Doctor extends mongoose.Document {
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
  current_hospital: mongoose.Schema.Types.ObjectId;
  specialty: string;
  patients: [];
}

const doctorSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "doctor",
    },
    otp: String,
    dob: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    address: {
      _id: false,
      address_line_1: String,
      address_line_2: String,
      city: String,
      state: String,
      country: String,
      zip_code: String,
    },
    current_hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    specialty: {
      type: String,
      required: true,
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  {
    collection: "doctor",
  }
);

export default mongoose.models.Doctor ||
  mongoose.model<Doctor>("Doctor", doctorSchema);
