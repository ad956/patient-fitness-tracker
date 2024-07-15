import { NextRequest, NextResponse } from "next/server";
import {
  PublicRoutes,
  redirectMiddleware,
  updateSessionMiddleware,
} from "@middlewares/index";

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

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.gif$|.*\\.ico$|.*\\.jpg$|.*\\.webp$|error).*)",
  ],
};
