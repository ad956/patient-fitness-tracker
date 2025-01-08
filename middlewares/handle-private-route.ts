import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@session";

export default async function handlePrivateRoute(
  request: NextRequest,
  token: string | undefined
) {
  const currentRole = request.nextUrl.pathname.split("/")[1];

  if (!token) {
    let loginUrl = currentRole === "admin" ? "/admin-login" : "/login";

    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  const decryptedToken = await decrypt(token);
  const userRole = decryptedToken.user.role;

  if (currentRole !== userRole) {
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }

  return NextResponse.next();
}
