import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@sessions/sessionUtils";

export default async function handlePublicRoute(
  request: NextRequest,
  token: string | undefined
) {
  if (token) {
    const decryptedToken = await decrypt(token);
    const userRole = decryptedToken.user.role;
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }
  return NextResponse.next();
}
