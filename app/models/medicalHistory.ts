import mongoose from "mongoose";

export interface MedicalHistory extends mongoose.Document {
  hospital: mongoose.Schema.Types.ObjectId;
  patient: mongoose.Schema.Types.ObjectId;
  doctor: mongoose.Schema.Types.ObjectId;
  start_date: string;
  end_date: string;
  TreatmentStatus: string;
  disease: string;
}

const medicalHistorySchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    TreatmentStatus: {
      type: String,
      enum: ["Ongoing", "Completed", "Cancelled"],
      default: "Ongoing",
    },
    disease: {
      type: String,
      required: true,
    },
  },
  {
    collection: "medicalhistory",
    timestamps: true,
  }
);

export default mongoose.models.MedicalHistory ||
  mongoose.model<MedicalHistory>("MedicalHistory", medicalHistorySchema);
