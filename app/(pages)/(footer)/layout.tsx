import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Patient Fitness Tracker Support Links",
	description:
		"The Patient Fitness Tracker is a modern healthcare platform designed to streamline patient management and monitoring across multiple hospitals.",
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
