import dbConfig from "@utils/db";
import { NextResponse } from "next/server";
import { Message } from "@models/index";
import { Types } from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConfig();
    const { roomId, userId } = await req.json();

    if (!roomId || !userId) {
      return NextResponse.json(
        { error: "roomId and userId are required" },
        { status: 400 }
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
    return NextResponse.json(
      { error: "Failed to mark messages as read" },
      { status: 500 }
    );
  }
}
