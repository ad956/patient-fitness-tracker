import { setSession } from "@/lib/sessions/sessionUtils";

export async function GET() {
  await setSession("66b72575fc219b2351f17180", "admin");
  return Response.json("OK");
}
