import { redirect } from "next/navigation";
import LandingPage from "./layouts/LandingPage";

export default function Home() {
	const isLogged = true;
	return isLogged ? redirect("/patient") : <LandingPage />;
}
