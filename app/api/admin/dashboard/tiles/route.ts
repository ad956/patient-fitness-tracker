import dbConfig from "@utils/db";
import { Hospital, Patient, Doctor, Receptionist } from "@models/index";

export async function GET(request: Request) {
  try {
    const role = request.headers.get("x-user-role");
    const email = request.headers.get("x-user-email");

    await dbConfig();

    // start of the current month and the previous month
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const [
      newHospitals,
      newPatients,
      newDoctors,
      newReceptionists,
      previousHospitals,
      previousPatients,
      previousDoctors,
      previousReceptionists,
    ] = await Promise.all([
      // Current month counts
      Hospital.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      Patient.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      Doctor.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      Receptionist.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),

      // Previous month counts
      Hospital.countDocuments({
        createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
      }),
      Patient.countDocuments({
        createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
      }),
      Doctor.countDocuments({
        createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
      }),
      Receptionist.countDocuments({
        createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
      }),
    ]);

    // Calculate percentage change
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) {
        return current === 0 ? 0 : 100; // 100% increase if previous was 0 and current is not
      }
      return Number((((current - previous) / previous) * 100).toFixed(2));
    };

    const result = {
      newHospitals: {
        count: newHospitals,
        change: calculateChange(newHospitals, previousHospitals),
      },
      newPatients: {
        count: newPatients,
        change: calculateChange(newPatients, previousPatients),
      },
      newDoctors: {
        count: newDoctors,
        change: calculateChange(newDoctors, previousDoctors),
      },
      newReceptionists: {
        count: newReceptionists,
        change: calculateChange(newReceptionists, previousReceptionists),
      },
    };

    return Response.json(result);
  } catch (error) {
    console.error("Error fetching tiles data :", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
