import { NextRequest } from "next/server";
import { logout, updateSession } from "@sessions/sessionUtils";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest) {
  // console.log("CALLED");
  // await updateSessionMiddleware(request);
  // redirectMiddleware(request);
}

export async function updateSessionMiddleware(request: NextRequest) {
  try {
    const res = await updateSession(request);
    console.log("in mid : " + res);

    if (res && res.status === 401) {
      await logout();
    }
    return Response.redirect(new URL("/login", request.url));
  } catch (error) {
    console.error("Error updating session:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
// function redirectMiddleware(request: NextRequest) {
//   const currentUser = request.cookies.get("session")?.value;
//   // console.log("currentUser : " + currentUser + " __ " + Date.now());

//   if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
//     return Response.redirect(new URL("/dashboard", request.url));
//   }

//   if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
//     return Response.redirect(new URL("/login", request.url));
//   }
// }

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
};
