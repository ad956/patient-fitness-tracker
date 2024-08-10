import mongoose from "mongoose";

export interface DemoUser extends mongoose.Document {
  role: string;
  referenceId: mongoose.Types.ObjectId;
}

const demoUserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["admin", "patient", "receptionist", "doctor", "hospital"],
      index: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "role",
    },
  },
  { collection: "demo_users", timestamps: true }
);

export default mongoose.models.DemoUser ||
  mongoose.model<DemoUser>("DemoUser", demoUserSchema);
