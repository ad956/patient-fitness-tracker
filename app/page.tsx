import { redirect } from "next/navigation";
import LandingPage from "./layouts/LandingPage";
import { getSession } from "@/lib/sessions/sessionUtils";

export default async function Home() {
  const isAuthenticated = await getSession();
  const userRole = isAuthenticated?.user.role;
  console.log("isAuth user : " + userRole);
  return isAuthenticated ? redirect(`/${userRole}`) : <LandingPage />;
}
