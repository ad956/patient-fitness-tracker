import { redirect } from "next/navigation";
import LandingPage from "./layouts/LandingPage";
import { getSession } from "@/lib/sessions/sessionUtils";

export default async function Home() {
  const isAuthenticated = await getSession();
  const user = await isAuthenticated;
  console.log("isAuth user : " + user);
  return user ? redirect("/patient") : <LandingPage />;
}
