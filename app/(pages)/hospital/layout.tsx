import { Sidebar, Headbar } from "@components/index";
import { getHospitalData } from "@lib/hospital";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syncure",
  description: "The page is for hospital related applications.",
};

export default async function HospitalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hospital = await getHospitalData();

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
