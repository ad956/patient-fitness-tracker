import Footer from "@/app/layouts/LandingPage/components/footer";
import Navbar from "@/app/layouts/LandingPage/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Patient Fitness Tracker Support Links",
	description:
		"The page contains support links for Patient Fitness Tracker  which is a modern healthcare platform designed to streamline patient management and monitoring across multiple hospitals.",
};

export default function FooterLinksLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="h-[80vh]">
			<Navbar />
			<main className="h-full">{children}</main>
			<Footer />
		</section>
	);
}
