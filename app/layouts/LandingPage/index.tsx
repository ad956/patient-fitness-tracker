import { Card, CardFooter, Image, Button, Divider } from "@nextui-org/react";
import About from "./components/about";
import ContactUS from "./components/contact";
import Features from "./components/features";
import Footer from "./components/footer";
import Intro from "./components/intro";
import Lifeline from "./components/lifeline";
import NavBar from "./components/navbar";
import ServicesOffered from "./components/services";
import Testimonial from "./components/testimonial";
import TrustedBy from "./components/trustedby";
import WorkingProcess from "./components/working";

export default function LandingPage() {
	return (
		<main className="h-[100vh] scroll-smooth">
			<NavBar />
			<Intro />
			<Lifeline />

			<section className="my-10 flex justify-center">
				<Divider className="w-4/5 bg-gray-400" />
			</section>

			<section className="flex justify-center items-center">
				<TrustedBy />
			</section>

			<Features />
			<WorkingProcess />

			<ServicesOffered />

			<Testimonial />

			<About />
			<ContactUS />
			<Footer />
		</main>
	);
}
