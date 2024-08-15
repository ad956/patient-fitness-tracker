import mongoose from "mongoose";

export interface BookedAppointment extends mongoose.Document {
  timing: {
    startTime: string;
    endTime: string;
  };
  state: string;
  city: string;
  hospital: {
    id: mongoose.Schema.Types.ObjectId;
    name: string;
  };
  disease: string;
  note: string;
  approved: string;
  patient_id: mongoose.Schema.Types.ObjectId;
  doctor_id: mongoose.Schema.Types.ObjectId;
  receptionist_id: mongoose.Schema.Types.ObjectId;
}

const bookedAppointmentsSchema = new mongoose.Schema(
  {
    timing: {
      startTime: { type: String, required: false },
      endTime: { type: String, required: false },
    },
    state: { type: String, required: true },
    city: { type: String, required: true },
    hospital: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
    },
    disease: { type: String, required: true },
    note: { type: String, required: true },
    approved: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    patient_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId },
    receptionist_id: { type: mongoose.Schema.Types.ObjectId },
  },
  { collection: "bookedAppointments", timestamps: true }
);

export default mongoose.models.BookedAppointment ||
  mongoose.model<BookedAppointment>(
    "BookedAppointment",
    bookedAppointmentsSchema
  );
