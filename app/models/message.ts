import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  message: string;
  roomId: string;
  senderId: {
    id: mongoose.Schema.Types.ObjectId;
    role: "patient" | "doctor";
  };
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
      index: true,
    },
    senderId: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "senderId.role",
      },
      role: {
        type: String,
        required: true,
        enum: ["patient", "doctor"],
      },
    },
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

messageSchema.index({ roomId: 1, createdAt: -1 });

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", messageSchema);
