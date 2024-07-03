import { Patient, Doctor, MedicalHistory, Hospital } from "@models/index";
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

    const patient = await Patient.findOne({ email }, { _id: 1 }).exec();
    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    const medicalHistory = await MedicalHistory.find(
      { patient: patient._id },
      {
        hospital: 1,
        doctor: 1,
        start_date: 1,
        end_date: 1,
        TreatmentStatus: 1,
        disease: 1,
      }
    )
      .populate("hospital", ["firstname", "lastname", "profile"])
      .populate("doctor", ["firstname", "lastname", "profile"])
      .exec();

    const formattedMedicalHistory = medicalHistory.map((history) => ({
      hospital: {
        name: `${history.hospital.firstname} ${history.hospital.lastname}`,
        profile: history.hospital.profile,
      },
      doctor: {
        name: `${history.doctor.firstname} ${history.doctor.lastname}`,
        profile: history.doctor.profile,
      },
      start_date: history.start_date,
      end_date: history.end_date,
      TreatmentStatus: history.TreatmentStatus,
      disease: history.disease,
    }));

    return Response.json(formattedMedicalHistory);
  } catch (error) {
    console.error("Error fetching medical history of patient : ", error);
    return Response.json(
      { error: "Failed to fetch medical history" },
      { status: 500 }
    );
  }
}
