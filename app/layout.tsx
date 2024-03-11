import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const lato = Lato({ weight: "400", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Patient Fitness Tracker",
	description:
		"The Patient Fitness Tracker is a modern healthcare platform designed to streamline patient management and monitoring across multiple hospitals.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={lato.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
