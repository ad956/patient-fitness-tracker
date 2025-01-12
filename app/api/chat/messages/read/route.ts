import dbConfig from "@utils/db";
import { NextResponse } from "next/server";
import { Message } from "@models/index";
import { Types } from "mongoose";
import { errorHandler, STATUS_CODES } from "@utils/index";
import authenticateUser from "@lib/auth/authenticate-user";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const { id, role } = await authenticateUser(authHeader);

    if (!id || !role) {
      return errorHandler("Missing user ID or role", STATUS_CODES.BAD_REQUEST);
    }

    const _id = new Types.ObjectId(id);

    await dbConfig();
    const { roomId } = await req.json();

    if (!roomId) {
      return errorHandler("roomId is required", STATUS_CODES.BAD_REQUEST);
    }

    // mark all unread messages in the room as read
    await Message.updateMany(
      {
        roomId: new Types.ObjectId(roomId),
        senderId: { $ne: _id },
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
