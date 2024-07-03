import mongoose from "mongoose";

export interface CommonDiseases extends mongoose.Document {
  commonDiseases: [String];
}

const diseaseSchema = new mongoose.Schema(
  {
    commonDiseases: [String],
  },
  {
    collection: "commonDiseases",
  }
);

export default mongoose.models.CommonDiseases ||
  mongoose.model<CommonDiseases>("CommonDiseases", diseaseSchema);
