import dbConfig from "@utils/db";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await dbConfig();

    const db = mongoose.connection.db;

    const [
      newHospitals,
      newPatients,
      newDoctors,
      newReceptionists,
      bookedAppointments,
    ] = await Promise.all([
      db.collection("hospital").countDocuments(),
      db.collection("patient").countDocuments(),
      db.collection("doctor").countDocuments(),
      db.collection("receptionist").countDocuments(),
      db
        .collection("bookedAppointment")
        .aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
            },
          },
        ])
        .toArray(),
    ]);

    const result = {
      newHospitals,
      newPatients,
      newDoctors,
      newReceptionists,
      newBookedAppointments: bookedAppointments[0]?.total || 0,
    };

    return Response.json(result);
  } catch (error) {
    console.error("Error fetching total counts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
