import dbConfig from "@utils/db";
import { Patient, Receptionist, Hospital, Doctor } from "@models/index";
import { HospitalUserDetails } from "@pft-types/admin";
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

    await dbConfig();

    // parse query parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const hospitalId = url.searchParams.get("hospitalId");

    if (!hospitalId) {
      return Response.json(
        { error: "hospitalId is required" },
        { status: 400 }
      );
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
      // base aggregation pipeline
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

      // create role-specific pipeline
      const createPipelineWithRole = (pipeline: any[], role: string) => [
        ...pipeline.slice(0, 1),
        { $addFields: { role: role } },
        ...pipeline.slice(1),
      ];

      // create role-specific pipelines
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

      // fetch users from each model
      const [patients, receptionists, doctors] = await Promise.all([
        Patient.aggregate(patientsPipeline),
        Receptionist.aggregate(receptionistsPipeline),
        Doctor.aggregate(doctorsPipeline),
      ]);

      // combine and map results
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

    return Response.json({
      users: userDetails,
      pagination: paginationMetadata,
    });
  } catch (error) {
    console.error("Error fetching Users data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
