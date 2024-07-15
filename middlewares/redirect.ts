import { decrypt } from "@sessions/sessionUtils";
import { NextRequest, NextResponse } from "next/server";

export const PublicRoutes = ["/", "/login", "/signup"];
export const PrivateRoutes = [
  "/patient",
  "/receptionist",
  "/doctor",
  "/hospital",
  // "/admin",
];

export async function redirectMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("session")?.value;

  const isPublicRoute = PublicRoutes.includes(path);
  const isPrivateRoute = PrivateRoutes.includes(`/${path.split("/")[1]}`); // extracts the user path from url

  if (token) {
    const decryptedToken = await decrypt(token);
    const userRole = decryptedToken.user.role;

    if (isPublicRoute && token) {
      return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }

    if (isPrivateRoute && path.split("/")[1] !== userRole) {
      return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }
  }
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  return NextResponse.next();
}
