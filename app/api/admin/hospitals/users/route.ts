import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import { Patient, Receptionist, Hospital, Doctor } from "@models/index";
import { ObjectId } from "mongodb";

export interface UserDetails {
  id: string;
  profile: string;
  name: string;
  role: string;
  username: string;
  gender: string;
  contact: string;
  city: string;
  state: string;
}

export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const role = decryptedUser.user.role;

    await dbConfig();

    if (role !== "admin") {
      return Response.json(
        {
          error:
            "Forbidden: You do not have the necessary permissions to access this resource.",
        },
        { status: 403 }
      );
    }

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
    const hospitalObjectId = new ObjectId(hospitalId);

    // Count total users before applying skip and limit
    const [patientCount, receptionistCount, doctorCount] = await Promise.all([
      Patient.countDocuments({ current_hospital: hospitalObjectId }),
      Receptionist.countDocuments({ current_hospital: hospitalObjectId }),
      Doctor.countDocuments({ current_hospital: hospitalObjectId }),
    ]);

    const totalUsers = patientCount + receptionistCount + doctorCount;

    let userDetails: UserDetails[] = [];

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
