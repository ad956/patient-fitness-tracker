import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const lato = Lato({ weight: "400", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syncure",
  description:
    "The Syncure is a modern healthcare platform designed to streamline patient management and monitoring across multiple hospitals.",
  keywords: [
    "Syncure",
    "Healthcare",
    "Patient Management",
    "Fitness Monitoring",
    "Health Tech",
  ],
  authors: [{ name: "Anand Suthar", url: "https://github.com/ad956" }],
  creator: "Anand Suthar",
  applicationName: "Syncure",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  publisher: "Anand Suthar",
  robots: "index, follow",
  metadataBase: new URL("https://patient-fitness-tracker.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://patient-fitness-tracker.vercel.app",
    title: "Syncure",
    description:
      "The Syncure is a modern healthcare platform designed to streamline patient management and monitoring across multiple hospitals.",
    siteName: "Syncure",
    images: [
      {
        url: "https://res.cloudinary.com/doahnjt5z/image/upload/v1736323154/pft/pft_png_logo.png",
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
