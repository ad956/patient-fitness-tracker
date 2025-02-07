import { NextResponse } from "next/server";
import Hospital from "@models/hospital";
import { HospitalDetails } from "@syncure-types/admin";
import { Types } from "mongoose";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { authenticateUser } from "@lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  // parse query parameters for pagination
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const admin_id = new Types.ObjectId(id);

    await dbConfig();

    // Count total hospitals before applying skip and limit
    const totalHospitals = await Hospital.countDocuments();
    let hospitals = [];

    if (skip < totalHospitals) {
      const hospitalsPipeline = [
        {
          $project: {
            profile: 1,
            name: { $concat: ["$firstname", " ", "$lastname"] },
            username: 1,
            contact: 1,
            "address.city": 1,
            "address.state": 1,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ];

      hospitals = await Hospital.aggregate(hospitalsPipeline);
    }

    // Map results to HospitalDetails
    const hospitalDetails: HospitalDetails[] = hospitals.map((hospital) => ({
      id: hospital._id.toString(),
      profile: hospital.profile || "",
      name: hospital.name,
      username: hospital.username,
      contact: hospital.contact || "",
      city: hospital.address?.city || "",
      state: hospital.address?.state || "",
    }));

    const totalPages = Math.ceil(totalHospitals / limit);

    const paginationMetadata = {
      currentPage: page,
      pageSize: limit,
      totalPages: totalPages,
      totalCount: totalHospitals,
    };

    return NextResponse.json({
      hospitals: hospitalDetails,
      pagination: paginationMetadata,
    });
  } catch (error: any) {
    console.error("Error fetching Hospital data:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
