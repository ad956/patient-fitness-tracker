import mongoose from "mongoose";

export interface Transaction extends mongoose.Document {
  transaction_id: string;
  timestamp: Date;
  patient_id: mongoose.Schema.Types.ObjectId;
  hospital_id: mongoose.Schema.Types.ObjectId;
  disease: string;
  description: string;
  amount: number;
  status: string;
}

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true, unique: true },
  timestamp: { type: Date, required: true },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  disease: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Success", "Failed", "Pending"],
  },
});

export default mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", transactionSchema);
