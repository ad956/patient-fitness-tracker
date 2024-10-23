import { NextResponse } from "next/server";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { Patient, Transaction } from "@models/index";
import { Types } from "mongoose";
import { authenticateUser } from "@lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const isPending = status === "pending";

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

    // build query
    const query: any = { patient: patient._id };
    if (status) {
      query.status = "Pending";
    }

    // get all transactions where patient ID matches
    const transactions = await Transaction.find(query)
      .populate("hospital", "firstname lastname profile")
      .select(
        isPending
          ? "hospital createdAt amount"
          : "hospital disease description createdAt amount status"
      )
      .sort({ createdAt: -1 });

    const formattedTransactions = transactions.map((transaction) => {
      const formattedData = {
        hospital: {
          name: `${transaction.hospital.firstname} ${transaction.hospital.lastname}`,
          profile: transaction.hospital.profile,
        },
        date: transaction.createdAt,
        amount: transaction.amount,
      };

      if (!isPending) {
        return {
          ...formattedData,
          disease: transaction.disease,
          description: transaction.description,
          status: transaction.status,
        };
      }

      return formattedData;
    });

    return NextResponse.json(formattedTransactions, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching payment data:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
