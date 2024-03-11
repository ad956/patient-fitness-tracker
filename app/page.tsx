import Dashboard from "./layouts/Dashboard";
import LandingPage from "./layouts/LandingPage";

export default function Home() {
	const isLogged = true;
	return isLogged ? <Dashboard /> : <LandingPage />;
}
