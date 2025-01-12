"use server";

import { getSessionToken } from "../session";
import fetchHandler from "@utils/fetch-handler";

export default async function createChatRoom(receiverId: string): Promise<any> {
  const endpoint = `/api/chat/room`;
  const session = getSessionToken();

  try {
    const result = await fetchHandler<any>(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId }),
      },
      session!
    );

    return result.data;
  } catch (error) {
    console.error("An error occurred while adding admin:", error);
    throw error;
  }
}
