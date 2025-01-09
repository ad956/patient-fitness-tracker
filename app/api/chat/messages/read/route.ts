import dbConfig from "@utils/db";
import { NextResponse } from "next/server";
import { Message } from "@models/index";
import { Types } from "mongoose";
import { errorHandler, STATUS_CODES } from "@utils/index";

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
    const { roomId, userId } = await req.json();

    if (!roomId || !userId) {
      return errorHandler(
        "roomId and userId are required",
        STATUS_CODES.BAD_REQUEST
      );
    }

    // mark all unread messages in the room as read
    await Message.updateMany(
      {
        roomId: new Types.ObjectId(roomId),
        senderId: { $ne: new Types.ObjectId(userId) },
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return errorHandler(
      "Failed to mark messages as read",
      STATUS_CODES.SERVER_ERROR
    );
  }
}
