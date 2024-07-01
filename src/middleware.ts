import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "@/app/lib/sessions/sessionUtils";

const PublicRoutes = ["/", "/login", "/signup"];
const PrivateRoutes = [
  "/patient",
  "/receptionist",
  "/doctor",
  "/hospital",
  "/admin",
];

export async function middleware(request: NextRequest) {
  if (!PublicRoutes.includes(request.nextUrl.pathname)) {
    const sessionUpdated = await updateSessionMiddleware(request);
    if (!sessionUpdated) {
      return NextResponse.redirect(new URL(`/session-expired`, request.url), {
        // removing existing session cookie
        headers: {
          "Set-Cookie": "session=; Path=/; Expires=",
        },
      });
    }
  }
  return redirectMiddleware(request);
}

export async function updateSessionMiddleware(request: NextRequest) {
  try {
    await updateSession(request);
    return true;
  } catch (error) {
    console.error("Error updating session:", error);
    return false;
  }
}

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

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.gif$|.*\\.ico$|.*\\.jpg$|.*\\.webp$|error).*)",
  ],
};
