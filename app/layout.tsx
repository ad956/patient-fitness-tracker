import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const lato = Lato({ weight: "400", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patient Fitness Tracker",
  description:
    "The Patient Fitness Tracker is a modern healthcare platform designed to streamline patient management and monitoring across multiple hospitals.",
  keywords: [
    "Patient Fitness Tracker",
    "Healthcare",
    "Patient Management",
    "Fitness Monitoring",
    "Health Tech",
  ],
  authors: [{ name: "Anand Suthar", url: "https://github.com/ad956" }],
  creator: "Anand Suthar",
  applicationName: "Patient Fitness Tracker",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  publisher: "Anand Suthar",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://patient-fitness-tracker.vercel.app",
    title: "Patient Fitness Tracker",
    description:
      "The Patient Fitness Tracker is a modern healthcare platform designed to streamline patient management and monitoring across multiple hospitals.",
    siteName: "Patient Fitness Tracker",
    images: [
      {
        url: "https://res.cloudinary.com/dtkfvp2ic/image/upload/v1711037583/patient_yluzvs_bnz9ox.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} scrollbar`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
