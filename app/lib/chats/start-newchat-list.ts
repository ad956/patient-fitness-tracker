"use server";

import { getSessionToken } from "../session";
import fetchHandler from "@utils/fetch-handler";

export default async function startNewChatList(): Promise<any> {
  const endpoint = `/api/chat/start-newchat-list`;
  const session = getSessionToken();

  try {
    const result = await fetchHandler<any>(endpoint, {}, session!);

    if (Array.isArray(result.data)) return result.data;
  } catch (error) {
    console.error("An error occurred while adding admin:", error);
    throw error;
  }
}
