import Headbar from "@/app/components/patient/Headbar";
import Sidebar from "@/app/components/patient/Sidebar";
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
		<main className="h-full flex">
			<Sidebar />
			<section className="flex flex-col">
				<Headbar />
				{children}
			</section>
		</main>
	);
}
