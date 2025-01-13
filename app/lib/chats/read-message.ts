"use server";

import { getSessionToken } from "../session";
import fetchHandler from "@utils/fetch-handler";

export default async function readMessage(roomId: string): Promise<any> {
  const endpoint = `/api/chat/messages/read`;
  const session = getSessionToken();

  try {
    const result = await fetchHandler<any>(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
        }),
      },
      session!
    );

    if (Array.isArray(result.data)) return result.data;
  } catch (error) {
    console.error("An error occurred while adding admin:", error);
    throw error;
  }
}
