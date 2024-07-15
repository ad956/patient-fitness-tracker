import { Receptionist } from "@types";
import { Sidebar, Headbar } from "@components/index";

import type { Metadata } from "next";
import { getReceptionistData } from "@lib/receptionist";

export const metadata: Metadata = {
  title: "Patient Fitness Tracker",
  description: "The page is for receptionist related applications.",
};

export default async function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const receptionist: Receptionist = await getReceptionistData();

  return (
    <main className="h-[100vh] flex">
      <Sidebar userType="receptionist" />
      <section className="flex flex-col w-full">
        <Headbar user={receptionist} role="receptionist" />
        {children}
      </section>
    </main>
  );
}
