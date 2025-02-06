import mongoose from "mongoose";

export interface HospitalDetails extends mongoose.Document {
  hospitalId: mongoose.Schema.Types.ObjectId;
  staff: [
    {
      firstName: string;
      lastName: string;
      profile: string;
      role: string;
      contact: string;
    }
  ];
  additionalInfo: {
    totalStaffCount: number;
    averageStaffExperience: number;
    servicesOffered: string[];
    equipmentAvailable: string[];
    operationalHours: string;
    emergencyContact: string;
  };
  hospitalStatus: {
    totalPatients: number;
    totalDoctors: number;
    totalStaff: number;
    emergencyCases: number;
    availableBeds: number;
  };
}

const hospitalDetailsSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    staff: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        profile: { type: String, required: true },
        role: { type: String, required: true },
        contact: { type: String, required: true },
      },
    ],
    additionalInfo: {
      totalStaffCount: { type: Number, required: true },
      averageStaffExperience: { type: Number, required: true },
      servicesOffered: [String],
      equipmentAvailable: [String],
      operationalHours: { type: String, required: true },
      emergencyContact: { type: String, required: true },
    },
    hospitalStatus: {
      totalPatients: { type: Number, required: true },
      totalDoctors: { type: Number, required: true },
      totalStaff: { type: Number, required: true },
      emergencyCases: { type: Number, required: true },
      availableBeds: { type: Number, required: true },
    },
  },
  {
    collection: "hospital_details",
    timestamps: true,
  }
);

export default mongoose.models.HospitalDetails ||
  mongoose.model<HospitalDetails>("HospitalDetails", hospitalDetailsSchema);
