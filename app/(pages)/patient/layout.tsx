import Script from "next/script";
import { Headbar, Sidebar } from "./components";
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
    <main className="h-screen flex">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Headbar />
        {children}
      </section>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </main>
  );
}
