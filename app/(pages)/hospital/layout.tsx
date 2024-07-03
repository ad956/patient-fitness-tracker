import { Sidebar } from "./components";
import { Headbar } from "@components/index";

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
  // const hospital = await getAdminData();
  const hospital = {
    _id: "",
    firstname: "ADMIN",
    profile: "",
    username: "ad956",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
    contact: "",
    address: {
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      zip_code: "",
    },
  };

  return (
    <main className="h-screen flex">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Headbar user={hospital} role="hospital" />
        {children}
      </section>
    </main>
  );
}
