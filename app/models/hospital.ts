import mongoose from "mongoose";

export interface Hospital extends mongoose.Document {
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
  patients: [];
  doctors: [];
  receptionists: [];
}

const hospitalSchema = new mongoose.Schema(
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
      default: "hospital",
    },
    otp: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    address: {
      address_line_1: {
        type: String,
        required: true,
      },
      address_line_2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      zip_code: {
        type: String,
        required: true,
      },
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    receptionists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receptionist",
      },
    ],
  },

  {
    collection: "hospital",
  }
);

export default mongoose.models.Hospital ||
  mongoose.model<Hospital>("Hospital", hospitalSchema);
