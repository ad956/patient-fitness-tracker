import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import Hospital from "@models/hospital";

export interface HospitalDetails {
  id: string;
  profile: string;
  name: string;
  username: string;
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

    if (role !== "admin") {
      return Response.json(
        {
          error:
            "Forbidden: You do not have the necessary permissions to access this resource.",
        },
        { status: 403 }
      );
    }

    await dbConfig();

    // parse query parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

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
    return Response.json({
      hospitals: hospitalDetails,
      pagination: paginationMetadata,
    });
  } catch (error) {
    console.error("Error fetching Hospital data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
