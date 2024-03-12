"use client";
import { useRouter } from "next/navigation";
import LandingPage from "./layouts/LandingPage";

export default function Home() {
	const router = useRouter();

	const isLogged = true;
	return isLogged ? router.push("/patient") : <LandingPage />;
}
