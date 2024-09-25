import { Patient, Receptionist, Hospital, Doctor } from "@models/index";
import { HospitalUserDetails } from "@pft-types/admin";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import authenticateUser from "@lib/auth/authenticateUser";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  // parse query parameters for pagination
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const hospitalId = url.searchParams.get("hospitalId");

  try {
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    await dbConfig();

    if (!hospitalId) {
      return errorHandler("hospitalId is required", STATUS_CODES.BAD_REQUEST);
    }

    // Convert hospitalId to ObjectId
    const hospitalObjectId = new Types.ObjectId(hospitalId);

    // Count total users before applying skip and limit
    const [patientCount, receptionistCount, doctorCount] = await Promise.all([
      Patient.countDocuments({ current_hospital: hospitalObjectId }),
      Receptionist.countDocuments({ current_hospital: hospitalObjectId }),
      Doctor.countDocuments({ current_hospital: hospitalObjectId }),
    ]);

    const totalUsers = patientCount + receptionistCount + doctorCount;

    let userDetails: HospitalUserDetails[] = [];

    if (skip < totalUsers) {
      // Base aggregation pipeline
      const baseAggregationPipeline = [
        {
          $match: {
            current_hospital: hospitalObjectId,
          },
        },
        {
          $project: {
            profile: 1,
            name: { $concat: ["$firstname", " ", "$lastname"] },
            username: 1,
            role: 1,
            gender: 1,
            contact: 1,
            "address.city": 1,
            "address.state": 1,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ];

      // Create role-specific pipeline
      const createPipelineWithRole = (pipeline: any[], role: string) => [
        ...pipeline.slice(0, 1),
        { $addFields: { role: role } },
        ...pipeline.slice(1),
      ];

      // Create role-specific pipelines
      const patientsPipeline = createPipelineWithRole(
        baseAggregationPipeline,
        "Patient"
      );
      const receptionistsPipeline = createPipelineWithRole(
        baseAggregationPipeline,
        "Receptionist"
      );
      const doctorsPipeline = createPipelineWithRole(
        baseAggregationPipeline,
        "Doctor"
      );

      // Fetch users from each model
      const [patients, receptionists, doctors] = await Promise.all([
        Patient.aggregate(patientsPipeline),
        Receptionist.aggregate(receptionistsPipeline),
        Doctor.aggregate(doctorsPipeline),
      ]);

      // Combine and map results
      const allUsers = [...patients, ...receptionists, ...doctors];
      userDetails = allUsers.map((user) => ({
        id: user._id.toString(),
        profile: user.profile || "",
        name: user.name,
        role: user.role,
        username: user.username,
        gender: user.gender || "",
        contact: user.contact || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
      }));
    }

    const totalPages = Math.ceil(totalUsers / limit);

    const paginationMetadata = {
      currentPage: page,
      pageSize: limit,
      totalPages: totalPages,
      totalCount: totalUsers,
    };

    return NextResponse.json({
      users: userDetails,
      pagination: paginationMetadata,
    });
  } catch (error: any) {
    console.error("Error fetching Users data:", error);
    return errorHandler(
      error.message || "Internal Server Error",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
