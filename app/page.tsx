import Dashboard from "./layouts/Patient";
import LandingPage from "./layouts/LandingPage";

export default function Home() {
	const isLogged = true;
	return isLogged ? <Dashboard /> : <LandingPage />;
}
