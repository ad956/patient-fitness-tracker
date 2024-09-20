import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@sessions/sessionUtils";
import { JWTExpired, JWTInvalid } from "jose/errors";

const SKIP_PATHS = ["/api/auth", "/api/demouser"];

export default async function handleApiRoute(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // skipping middleware
  if (SKIP_PATHS.some((skipPath) => path.startsWith(skipPath))) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decryptedToken = await decrypt(token);
    const userRole = decryptedToken.user.role;

    // extract the API route path
    const apiPath = request.nextUrl.pathname.split("/api/")[1];
    const [routeRole, ...rest] = apiPath.split("/");

    // check if the user has the right role to access this API route
    if (routeRole !== userRole && userRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // attach user info to the request
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-role", userRole);
    requestHeaders.set("x-user-email", decryptedToken.user.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Error in API middleware:", error);

    if (error instanceof JWTExpired) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    } else if (error instanceof JWTInvalid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    } else if (error instanceof Error) {
      // handle other known errors
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
