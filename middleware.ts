import { NextRequest } from "next/server";
import { updateSession } from "./lib/authUtils";

export async function middleware(request: NextRequest) {
  await updateSessionMiddleware(request);
  // redirectMiddleware(request);
}

async function updateSessionMiddleware(request: NextRequest) {
  return await updateSession(request);
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

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
//   missing: [
//     { type: "header", key: "next-router-prefetch" },
//     { type: "header", key: "purpose", value: "prefetch" },
//   ],
// };
