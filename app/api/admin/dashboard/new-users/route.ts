import dbConfig from "@utils/db";
import { decrypt } from "@sessions/sessionUtils";
import mongoose from "mongoose";

interface User {
  name: string;
  createdAt: Date;
  type: string;
}

interface FormattedUser {
  message: string;
  timeSince: string;
}

interface PaginatedResponse {
  users: FormattedUser[];
  page: number;
  totalPages: number;
  totalItems: number;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  try {
    await dbConfig();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const collections = ["hospital", "patient", "doctor", "receptionist"];
    let allNewUsers: User[] = [];

    for (const collection of collections) {
      const users = await mongoose.connection.db
        .collection(collection)
        .find<User>(
          { createdAt: { $gte: oneMonthAgo } },
          {
            projection: {
              name: 1,
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

    const paginatedUsers: FormattedUser[] = allNewUsers
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
          message: `**New ${typeMap[user.type]} Registered**\n${
            user.name
          } registered as a new ${user.type}.`,
          timeSince: timeSince,
        };
      });

    const response: PaginatedResponse = {
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
