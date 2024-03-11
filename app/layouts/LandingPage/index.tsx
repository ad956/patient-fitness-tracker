import About from "@/app/components/about";
import ContactUS from "@/app/components/contact";
import Features from "@/app/components/features";
import Footer from "@/app/components/footer";
import Intro from "@/app/components/intro";
import Lifeline from "@/app/components/lifeline";
import NavBar from "@/app/components/navbar";
import ServicesOffered from "@/app/components/services";
import Testimonial from "@/app/components/testimonial";
import TrustedBy from "@/app/components/trustedby";
import WorkingProcess from "@/app/components/working";
import { Card, CardFooter, Image, Button, Divider } from "@nextui-org/react";

export default function LandingPage() {
	return (
		<main className="h-[100vh]">
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
