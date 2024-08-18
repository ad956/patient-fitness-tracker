import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import { Admin, Patient, Receptionist, Hospital, Doctor } from "@models/index";

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
  // const session = request.headers.get("Authorization");
  // if (!session) {
  //   return Response.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    // const token = session.split("Bearer ")[1];
    // const decryptedUser = await decrypt(token);
    // const email = decryptedUser.user.email;

    // await dbConfig();

    // const adminData = await Admin.findOne({ email });

    // if (!adminData) {
    //   return Response.json({ error: "Admin not found" }, { status: 404 });
    // }

    // parse query parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // base aggregation pipeline
    const baseAggregationPipeline = [
      {
        $project: {
          profile: 1,
          name: { $concat: ["$firstname", " ", "$lastname"] },
          username: 1,
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
    const hospitalsPipeline = createPipelineWithRole(
      baseAggregationPipeline,
      "Hospital"
    );

    // fetch users from each model
    const [patients, receptionists, doctors, hospitals] = await Promise.all([
      Patient.aggregate(patientsPipeline),
      Receptionist.aggregate(receptionistsPipeline),
      Doctor.aggregate(doctorsPipeline),
      Hospital.aggregate(hospitalsPipeline),
    ]);

    // combine and map results
    const allUsers = [...patients, ...receptionists, ...doctors, ...hospitals];
    const userDetails: UserDetails[] = allUsers.map((user) => ({
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

    // pagination count
    const [patientCount, receptionistCount, doctorCount, hospitalCount] =
      await Promise.all([
        Patient.countDocuments(),
        Receptionist.countDocuments(),
        Doctor.countDocuments(),
        Hospital.countDocuments(),
      ]);
    const totalUsers =
      patientCount + receptionistCount + doctorCount + hospitalCount;

    const paginationMetadata = {
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalUsers / limit),
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
