import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@sessions/sessionUtils";
import {
  handleExpiredSession,
  handlePrivateRoute,
  handlePublicRoute,
} from "@middlewares/index";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/admin-login"];
const PRIVATE_ROUTES = [
  "/patient",
  "/receptionist",
  "/doctor",
  "/hospital",
  "/admin",
];

const SESSION_COOKIE = "session";
const SESSION_EXPIRED_URL = "/session-expired";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  // update session
  if (token) {
    try {
      await updateSession(request);
    } catch (error) {
      const USER_ROLE = path.split("/")[1];

      return handleExpiredSession(
        request,
        SESSION_COOKIE,
        `${SESSION_EXPIRED_URL}?role=${USER_ROLE}`
      );
    }
  }

  // check if it's a public route
  if (PUBLIC_ROUTES.includes(path)) {
    return handlePublicRoute(request, token);
  }

  // handle private routes
  if (PRIVATE_ROUTES.includes(`/${path.split("/")[1]}`)) {
    return handlePrivateRoute(request, token);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.gif$|.*\\.ico$|.*\\.jpg$|.*\\.webp$|error).*)",
  ],
};
