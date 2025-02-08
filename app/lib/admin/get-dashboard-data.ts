"use server";

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { authenticateUser } from "@lib/auth";
import { dbConfig, errorHandler, STATUS_CODES } from "@utils/index";
import { Hospital, Patient, Doctor, Receptionist } from "@models/index";

// Fetch Tiles Data
export async function getTilesData(): Promise<TilesDataType> {
  try {
    await dbConfig();

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const [
      newHospitals,
      newPatients,
      newDoctors,
      newReceptionists,
      previousHospitals,
      previousPatients,
      previousDoctors,
      previousReceptionists,
    ] = await Promise.all([
      Hospital.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      Patient.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      Doctor.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      Receptionist.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      Hospital.countDocuments({
        createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
      }),
      Patient.countDocuments({
        createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
      }),
      Doctor.countDocuments({
        createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
      }),
      Receptionist.countDocuments({
        createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
      }),
    ]);

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current === 0 ? 0 : 100;
      return Number((((current - previous) / previous) * 100).toFixed(2));
    };

    return {
      newHospitals: {
        count: newHospitals,
        change: calculateChange(newHospitals, previousHospitals),
      },
      newPatients: {
        count: newPatients,
        change: calculateChange(newPatients, previousPatients),
      },
      newDoctors: {
        count: newDoctors,
        change: calculateChange(newDoctors, previousDoctors),
      },
      newReceptionists: {
        count: newReceptionists,
        change: calculateChange(newReceptionists, previousReceptionists),
      },
    };
  } catch (error) {
    console.error("Error fetching tiles data:", error);
    throw new Error("Failed to fetch tiles data");
  }
}

export async function getRecentUsersData(page: number): Promise<any> {
  //PaginatedResponse
  try {
    await dbConfig();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const collections = ["hospital", "patient", "doctor", "receptionist"];
    let allNewUsers: RecentUserTile[] = [];

    for (const collection of collections) {
      const users = await mongoose.connection.db
        .collection(collection)
        .find<RecentUserTile>(
          { createdAt: { $gte: oneMonthAgo } },
          {
            projection: {
              firstname: 1,
              createdAt: 1,
              type: { $literal: collection },
            },
          }
        )
        .toArray();

      allNewUsers = allNewUsers.concat(users);
    }

    allNewUsers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const totalItems = allNewUsers.length;
    const totalPages = Math.ceil(totalItems / 10);
    const skip = (page - 1) * 10;

    const paginatedUsers: FormattedRecentUser[] = allNewUsers
      .slice(skip, skip + 10)
      .map((user) => {
        const timeSince = getTimeSince(user.createdAt);
        const typeMap: { [key: string]: string } = {
          hospital: "Hospital",
          patient: "Patient",
          doctor: "Doctor",
          receptionist: "Receptionist",
        };
        return {
          title: `New ${typeMap[user.type]} Registered`,
          description: `${user.firstname} registered as a new ${user.type}.`,
          timeSince,
        };
      });

    return { users: paginatedUsers, page, totalPages, totalItems };
  } catch (error) {
    console.error("Error fetching new users:", error);
    throw new Error("Failed to fetch recent users");
  }
}

function getTimeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}
