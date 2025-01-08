import { NextResponse } from "next/server";

export function POST() {
  try {
    const user = {
      id: 1,
      username: "johnDoe123",
      name: "John Doe",
    };

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log("got an error : " + error.message);
  }
}
