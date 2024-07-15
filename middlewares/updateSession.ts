import { updateSession } from "@sessions/sessionUtils";
import { NextRequest } from "next/server";

export default async function updateSessionMiddleware(request: NextRequest) {
  try {
    await updateSession(request);
    return true;
  } catch (error) {
    console.error("Error updating session:", error);
    return false;
  }
}
