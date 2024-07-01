import mongoose from "mongoose";

export interface Patient extends mongoose.Document {
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
  physicalDetails: {
    age: number;
    blood: string;
    height: number;
    weight: number;
  };
  progress: {
    generalHealth: number;
    waterBalance: number;
    currentTreatment: number;
    pendingAppointments: number;
  };
  medicines: [
    {
      name: string;
      dosage: string;
      frequency: string;
    }
  ];
  healthConditions: number[];
}

const addressSchema = new mongoose.Schema({
  address_line_1: String,
  address_line_2: String,
  city: String,
  state: String,
  country: String,
  zip_code: String,
});

const medicineSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  frequency: String,
});

const patientSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "patient" },
    otp: String,
    dob: { type: Date, required: false },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female", "Other"],
    },
    contact: { type: String, required: false },
    profile: String,
    address: addressSchema,
    current_hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    physicalDetails: {
      age: Number,
      blood: String,
      height: Number,
      weight: Number,
    },
    progress: {
      generalHealth: Number,
      waterBalance: Number,
      currentTreatment: Number,
      pendingAppointments: Number,
    },
    medicines: [medicineSchema],
    healthConditions: [Number],
  },
  { collection: "patient" }
);

export default mongoose.models.Patient ||
  mongoose.model<Patient>("Patient", patientSchema);
