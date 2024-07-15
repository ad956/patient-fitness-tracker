import { Sidebar, Headbar } from "@components/index";
import { getHospitalData } from "@/lib/hospital";
import { Hospital } from "@types";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Fitness Tracker",
  description: "The page is for hospital related applications.",
};

export default async function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hospital: Hospital = await getHospitalData();

  return (
    <main className="h-screen flex">
      <Sidebar userType="hospital" />
      <section className="flex flex-col w-full">
        <Headbar user={hospital} role="hospital" />
        {children}
      </section>
    </main>
  );
}
