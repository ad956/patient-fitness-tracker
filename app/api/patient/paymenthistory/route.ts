import { NextResponse } from "next/server";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { Patient, Transaction } from "@models/index";
import { Types } from "mongoose";
import { authenticateUser } from "@lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const patient_id = new Types.ObjectId(id);
    await dbConfig();

    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return errorHandler("Patient not found", STATUS_CODES.NOT_FOUND);
    }

    // get all transactions where patient ID matches
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

    return NextResponse.json(formattedTransactions, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching payment data:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
