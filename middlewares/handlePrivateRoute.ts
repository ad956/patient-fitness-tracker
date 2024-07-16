import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@sessions/sessionUtils";

export default async function handlePrivateRoute(
  request: NextRequest,
  token: string | undefined
) {
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decryptedToken = await decrypt(token);
  const userRole = decryptedToken.user.role;
  const currentRole = request.nextUrl.pathname.split("/")[1];

  if (currentRole !== userRole) {
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }

  return NextResponse.next();
}
