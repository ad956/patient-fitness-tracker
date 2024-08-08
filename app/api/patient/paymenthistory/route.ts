import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import { Patient, Hospital, Transaction } from "@models/index";

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    await dbConfig();

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }

    // get all transactions where patient id matches
    const transactions = await Transaction.find({
      patient: patient._id,
    })
      .populate("hospital", "firstname lastname profile")
      .select("hospital disease description createdAt amount status")
      .sort({ createdAt: -1 });

    const formattedTransactions = transactions.map(
      ({ hospital, disease, description, createdAt, amount, status }) => ({
        hospital: {
          name: `${hospital.firstname} ${hospital.lastname}`,
          profile: hospital.profile,
        },
        disease,
        description,
        date: createdAt,
        amount,
        status,
      })
    );

    return Response.json(formattedTransactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching payment data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
