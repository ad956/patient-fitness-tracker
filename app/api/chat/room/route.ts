import { NextResponse } from "next/server";
import dbConfig from "@utils/db";
import { Room } from "@models/chat";
import { Types } from "mongoose";
import { errorHandler, STATUS_CODES } from "@utils/index";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    // Authorization check
    if (!authHeader) {
      return errorHandler(
        "Authorization header is missing",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    await dbConfig();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");

    if (!userId || !role) {
      return errorHandler("Missing userId or role", STATUS_CODES.BAD_REQUEST);
    }

    // find all rooms where the user is a participant
    const rooms = await Room.find({
      participants: {
        $elemMatch: { userId: new Types.ObjectId(userId), role },
      },
    })
      .populate([
        {
          path: "participants.userId",
          match: { role: { $ne: role } }, // get the other participant's info
          select: "firstname lastname profile specialty",
        },
        {
          path: "lastMessage",
          select: "message createdAt isRead",
        },
      ])
      .sort({ updatedAt: -1 });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    return errorHandler(
      "Failed to fetch chat rooms",
      STATUS_CODES.SERVER_ERROR
    );
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    // Authorization check
    if (!authHeader) {
      return errorHandler(
        "Authorization header is missing",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    await dbConfig();
    const { patientId, doctorId } = await req.json();

    if (!patientId || !doctorId) {
      return errorHandler(
        "Both patientId and doctorId are required",
        STATUS_CODES.BAD_REQUEST
      );
    }

    // check if room already exists
    const existingRoom = await Room.findOne({
      participants: {
        $all: [
          {
            $elemMatch: {
              userId: new Types.ObjectId(patientId),
              role: "Patient",
            },
          },
          {
            $elemMatch: {
              userId: new Types.ObjectId(doctorId),
              role: "Doctor",
            },
          },
        ],
      },
    });

    if (existingRoom) {
      return NextResponse.json(existingRoom);
    }

    // create new room
    const room = await Room.create({
      participants: [
        { userId: patientId, role: "Patient" },
        { userId: doctorId, role: "Doctor" },
      ],
    });

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error creating chat room:", error);
    return errorHandler(
      "Failed to create chat room",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
