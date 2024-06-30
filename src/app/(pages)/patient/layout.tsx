import Script from "next/script";
import { Sidebar } from "./components";
import { Headbar } from "@components/index";
import { Patient } from "@/types";
import { getPatientData } from "@lib/patient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Fitness Tracker",
  description: "The page is for patient related applications.",
};

export default async function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const patient: Patient = await getPatientData();

  return (
    <main className="h-screen flex">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Headbar user={patient} role="patient" />
        {children}
      </section>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </main>
  );
}
