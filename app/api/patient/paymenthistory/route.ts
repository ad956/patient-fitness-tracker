import dbConfig from "@utils/db";
import { Patient, Hospital, Transaction } from "@models/index";
import { Types } from "mongoose";

export async function GET(request: Request) {
  try {
    const id = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");

    if (!id || !role) {
      return Response.json(
        { error: "Missing user ID or role" },
        { status: 400 }
      );
    }

    const patient_id = new Types.ObjectId(id);

    await dbConfig();

    const patient = await Patient.findById(patient_id);
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
