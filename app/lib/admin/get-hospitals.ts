"use server";

import { Hospital, Patient, Receptionist, Doctor } from "@models/index";
import { Types } from "mongoose";
import { dbConfig } from "@utils/index";
import authenticateUser from "../auth/authenticate-user";

export async function getHospitalsList(
  currentPage: number = 1,
  pageSize: number = 10
): Promise<{
  hospitals: HospitalDetails[];
  pagination: PaginationMetadata;
}> {
  try {
    const { id, role } = await authenticateUser();

    if (!id || !role) {
      throw new Error("Missing user ID or role in session");
    }

    const admin_id = new Types.ObjectId(id);
    await dbConfig();

    // Count total hospitals before applying skip and limit
    const totalHospitals = await Hospital.countDocuments();
    const skip = (currentPage - 1) * pageSize;
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
        { $limit: pageSize },
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

    const totalPages = Math.ceil(totalHospitals / pageSize);

    return {
      hospitals: hospitalDetails,
      pagination: {
        currentPage,
        pageSize,
        totalPages,
        totalCount: totalHospitals,
      },
    };
  } catch (error: any) {
    console.error("An error occurred while fetching hospitals list:", error);
    throw error;
  }
}

export async function getHospitalDetails(
  hospitalId: string,
  currentPage: number = 1,
  pageSize: number = 10
): Promise<{
  users: HospitalUserDetails[];
  pagination: PaginationMetadata;
}> {
  try {
    const { id, role } = await authenticateUser();

    if (!id || !role) {
      throw new Error("Missing user ID or role in session");
    }

    await dbConfig();

    if (!hospitalId) {
      throw new Error("hospitalId is required");
    }

    const hospitalObjectId = new Types.ObjectId(hospitalId);
    const skip = (currentPage - 1) * pageSize;

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
        { $limit: pageSize },
      ];

      // Create role-specific pipeline
      const createPipelineWithRole = (pipeline: any[], role: string) => [
        ...pipeline.slice(0, 1),
        { $addFields: { role: role } },
        ...pipeline.slice(1),
      ];

      // Fetch users from each model
      const [patients, receptionists, doctors] = await Promise.all([
        Patient.aggregate(
          createPipelineWithRole(baseAggregationPipeline, "Patient")
        ),
        Receptionist.aggregate(
          createPipelineWithRole(baseAggregationPipeline, "Receptionist")
        ),
        Doctor.aggregate(
          createPipelineWithRole(baseAggregationPipeline, "Doctor")
        ),
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

    const totalPages = Math.ceil(totalUsers / pageSize);

    return {
      users: userDetails,
      pagination: {
        currentPage,
        pageSize,
        totalPages,
        totalCount: totalUsers,
      },
    };
  } catch (error: any) {
    console.error("An error occurred while fetching hospital details:", error);
    throw error;
  }
}
