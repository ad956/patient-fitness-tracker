import dbConfig from "@/lib/db";
import { decrypt } from "@sessions/sessionUtils";

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    const db = await dbConfig();
    const collection = db.collection("patient");

    const projection = { _id: 1 };
    const patient = await collection.findOne({ email }, { projection });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    const medicalHistoryCollection = db.collection("medicalhistory");

    const medicalHistory = await medicalHistoryCollection
      .find({ patient: patient._id })
      .toArray();

    const _projection = { _id: 0, firstname: 1, lastname: 1, profile: 1 };
    const hospitalCollection = db.collection("hospital");
    const doctorCollection = db.collection("doctor");

    const hospitalsPromise = medicalHistory.map(async (history) => {
      const hospital = await hospitalCollection.findOne(
        { _id: history.hospital },
        { projection: history._projection }
      );
      return hospital;
    });

    const doctorsPromise = medicalHistory.map(async (history) => {
      const doctor = await doctorCollection.findOne(
        { _id: history.doctor },
        { projection: history._projection }
      );
      return doctor;
    });

    const hospitals = await Promise.all(hospitalsPromise);
    const doctors = await Promise.all(doctorsPromise);

    // Format medical history data according to MedicalHistoryType interface
    const formattedMedicalHistory = medicalHistory.map((history, index) => ({
      hospital: {
        name: hospitals[index]?.firstname + " " + hospitals[index]?.lastname,
        profile: hospitals[index]?.profile,
      },
      doctor: {
        name: doctors[index]?.firstname + " " + doctors[index]?.lastname,
        profile: doctors[index]?.profile,
      },
      start_date: history.start_date,
      end_date: history.end_date,
      TreatmentStatus: history.TreatmentStatus,
      disease: history.disease,
    }));

    return Response.json(formattedMedicalHistory);
  } catch (error) {
    console.error("Error fetching hospital data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
