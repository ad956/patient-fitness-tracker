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
// StateDocument
interface CityStateHospital extends mongoose.Document {
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

const stateSchema = new mongoose.Schema<CityStateHospital>(
  {
    name: { type: String, required: true },
    cities: [citySchema],
  },
  {
    collection: "citystate_hospitals",
  }
);

export default mongoose.models.CityStateHospital ||
  mongoose.model<CityStateHospital>("CityStateHospital", stateSchema);
