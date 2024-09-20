import dbConfig from "@utils/db";
import mongoose from "mongoose";
import {
  FormattedRecentUser,
  RecentUserTile,
  RecentUserPaginatedResponse,
} from "@pft-types/admin";

export async function GET(request: Request): Promise<Response> {
  const id = request.headers.get("x-user-id");
  const role = request.headers.get("x-user-role");

  if (!id || !role) {
    return Response.json({ error: "Missing user ID or role" }, { status: 400 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

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

    // Sort all users by createdAt in descending order
    allNewUsers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const totalItems = allNewUsers.length;
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    const paginatedUsers: FormattedRecentUser[] = allNewUsers
      .slice(skip, skip + limit)
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
          timeSince: timeSince,
        };
      });

    const response: RecentUserPaginatedResponse = {
      users: paginatedUsers,
      page,
      totalPages,
      totalItems,
    };

    return Response.json(response);
  } catch (error) {
    console.error("Error fetching new users:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
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
