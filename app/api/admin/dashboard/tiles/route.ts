import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import mongoose from "mongoose";

export async function GET(request: Request) {
  // const session = request.headers.get("Authorization");
  // if (!session) {
  //   return Response.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    // const token = session.split("Bearer ")[1];
    // await decrypt(token);

    await dbConfig();

    const pipeline = [
      {
        $facet: {
          hospitals: [
            { $lookup: { from: "hospital", pipeline: [], as: "hospitals" } },
            { $unwind: "$hospitals" },
            { $count: "total" },
          ],
          patients: [
            { $lookup: { from: "patient", pipeline: [], as: "patients" } },
            { $unwind: "$patients" },
            { $count: "total" },
          ],
          doctors: [
            { $lookup: { from: "doctor", pipeline: [], as: "doctors" } },
            { $unwind: "$doctors" },
            { $count: "total" },
          ],
          receptionists: [
            {
              $lookup: {
                from: "receptionist",
                pipeline: [],
                as: "receptionists",
              },
            },
            { $unwind: "$receptionists" },
            { $count: "total" },
          ],
          bookedAppointments: [
            {
              $lookup: {
                from: "bookedAppointment",
                pipeline: [],
                as: "appointments",
              },
            },
            { $unwind: "$appointments" },
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
                upcoming: {
                  $sum: {
                    $cond: [{ $gte: ["$appointments.date", new Date()] }, 1, 0],
                  },
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalHospitals: { $arrayElemAt: ["$hospitals.total", 0] },
          totalPatients: { $arrayElemAt: ["$patients.total", 0] },
          totalDoctors: { $arrayElemAt: ["$doctors.total", 0] },
          totalReceptionists: { $arrayElemAt: ["$receptionists.total", 0] },
          totalBookedAppointments: {
            $arrayElemAt: ["$bookedAppointments.total", 0],
          },
          upcomingAppointments: {
            $arrayElemAt: ["$bookedAppointments.upcoming", 0],
          },
        },
      },
    ];

    const totalCounts = await mongoose.connection.db
      .collection("hospital")
      .aggregate(pipeline)
      .toArray();

    return Response.json(totalCounts[0]);
  } catch (error) {
    console.error("Error fetching total counts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
