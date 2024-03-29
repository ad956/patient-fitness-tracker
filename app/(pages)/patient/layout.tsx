import Headbar from "@/app/(pages)/patient/components/Headbar";
import Sidebar from "@/app/(pages)/patient/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Patient Fitness Tracker",
	description: "The page is for patient related applications.",
};

export default function PatientLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-[100vh] flex">
			<Sidebar />
			<section className="flex flex-col w-full">
				<Headbar />
				{children}
			</section>
		</main>
	);
}
