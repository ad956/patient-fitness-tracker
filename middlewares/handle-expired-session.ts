import { NextRequest, NextResponse } from "next/server";

export default function handleExpiredSession(
  request: NextRequest,
  SESSION_COOKIE: string,
  SESSION_EXPIRED_URL: string
) {
  return NextResponse.redirect(new URL(SESSION_EXPIRED_URL, request.url), {
    headers: {
      "Set-Cookie": `${SESSION_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    },
  });
}
