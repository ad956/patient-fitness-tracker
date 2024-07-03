import mongoose from "mongoose";

interface HospitalDocument extends mongoose.Document {
  hospital_id: string | null;
  hospital_name: string;
  appointment_charge: string;
}

interface CityDocument extends mongoose.Document {
  name: string;
  hospitals: HospitalDocument[];
}

interface StateDocument extends mongoose.Document {
  name: string;
  cities: CityDocument[];
}

const hospitalSchema = new mongoose.Schema<HospitalDocument>({
  hospital_id: { type: String, default: null },
  hospital_name: { type: String, required: true },
  appointment_charge: { type: String, required: true },
});

const citySchema = new mongoose.Schema<CityDocument>({
  name: { type: String, required: true },
  hospitals: [hospitalSchema],
});

const stateSchema = new mongoose.Schema<StateDocument>(
  {
    name: { type: String, required: true },
    cities: [citySchema],
  },
  {
    collection: "citystate_hospitals",
  }
);

export default mongoose.models.StateDocument ||
  mongoose.model<StateDocument>("StateDocument", stateSchema);
