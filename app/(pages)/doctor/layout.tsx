import { Sidebar, Headbar } from "@components/index";
import { getDoctorData } from "@lib/doctor";
import { Doctor } from "@types";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Fitness Tracker",
  description: "The page is for doctor related applications.",
};

export default async function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const doctor: Doctor = await getDoctorData();

  return (
    <main className="h-screen flex">
      <Sidebar userType="doctor" />
      <section className="flex flex-col w-full">
        <Headbar user={doctor} role="doctor" />
        {children}
      </section>
    </main>
  );
}
