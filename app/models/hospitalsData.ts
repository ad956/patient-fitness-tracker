// import mongoose from "mongoose";

// export interface CityStateHospital extends mongoose.Document {
//   State: {
//     City: [
//       {
//         hospital_id: null;
//         hospital_name: "Apollo Hospitals";
//         appointment_charge: "250";
//       },
//       {
//         hospital_id: null;
//         hospital_name: "Yashoda Hospitals";
//         appointment_charge: "250";
//       },
//       {
//         hospital_id: null;
//         hospital_name: "KIMS Hospitals";
//         appointment_charge: "250";
//       },
//       {
//         hospital_id: null;
//         hospital_name: "Continental Hospitals";
//         appointment_charge: "250";
//       },
//       {
//         hospital_id: null;
//         hospital_name: "Sunshine Hospitals";
//         appointment_charge: "250";
//       }
//     ];
//   };
// }

// const hospitalsDataSchema = new mongoose.Schema({
//   hospital_id: String,
//   hospital_name: { type: String, required: true },
//   appointment_charge: { type: String, required: true },
// });

// const cityStateSchema = new mongoose.Schema(
//   {
//     _id: { type: mongoose.Schema.Types.ObjectId, required: true },
//     state: String,
//     cities: [
//       {
//         city_name: { type: String, required: true },
//         hospitals: [hospitalsDataSchema],
//       },
//     ],
//   },
//   {
//     collection: "citystate_hospitals",
//   }
// );

// const HospitalsData = mongoose.model("HospitalsData", cityStateSchema);

// export default HospitalsData;
