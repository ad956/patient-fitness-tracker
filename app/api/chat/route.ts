import { pusherServer } from "@lib/pusher";
import { NextResponse } from "next/server";
import { dbConfig } from "@utils/index";
import { Message } from "@models/index";

export async function POST(req: Request) {
  try {
    await dbConfig();

    const { message, senderId, senderRole, roomId } = await req.json();

    const newMessage = await Message.create({
      message,
      roomId,
      senderId: {
        id: senderId,
        role: senderRole,
      },
    });

    const populatedMessage = await newMessage.populate("senderId.id");

    await pusherServer.trigger(
      `chat-${roomId}`,
      "new-message",
      populatedMessage
    );

    return NextResponse.json(populatedMessage);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConfig();
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    if (!roomId) {
      return NextResponse.json({ error: "Room ID required" }, { status: 400 });
    }

    const messages = await Message.find({ roomId })
      .populate("senderId.id")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
