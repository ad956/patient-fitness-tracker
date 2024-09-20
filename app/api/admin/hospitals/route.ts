import dbConfig from "@utils/db";
import Hospital from "@models/hospital";
import { HospitalDetails } from "@pft-types/admin";
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

    const admin_id = new Types.ObjectId(id);

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
