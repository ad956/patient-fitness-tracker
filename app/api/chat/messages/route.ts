import dbConfig from "@utils/db";
import { NextResponse } from "next/server";
import { Patient, Doctor, Message, Room } from "@models/index";
import { pusherServer } from "@lib/pusher";
import { Types } from "mongoose";

export async function GET(req: Request) {
  try {
    await dbConfig();
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    if (!roomId) {
      return NextResponse.json(
        { error: "roomId is required" },
        { status: 400 }
      );
    }

    const messages = await Message.find({ roomId: new Types.ObjectId(roomId) })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("senderId", "firstname lastname profile")
      .sort({ createdAt: 1 });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConfig();
    const { roomId, senderId, senderRole, message } = await req.json();

    console.log(roomId);
    console.log(senderId);
    console.log(senderRole);
    console.log(message);

    if (!roomId || !senderId || !senderRole || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      roomId: new Types.ObjectId(roomId),
      senderId: new Types.ObjectId(senderId),
      senderRole,
      message,
    });

    // update room's lastMessage and timestamp
    await Room.findByIdAndUpdate(new Types.ObjectId(roomId), {
      lastMessage: newMessage._id,
      updatedAt: new Date(),
    });

    // trigger Pusher event
    await pusherServer.trigger(`chat-${roomId}`, "new-message", newMessage);

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
