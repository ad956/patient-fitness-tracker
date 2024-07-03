import { Sidebar } from "./components";
import { Headbar } from "@components/index";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Fitness Tracker",
  description: "The page is for admin related applications.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const admin = await getAdminData();
  const admin = {
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
        <Headbar user={admin} role="admin" />
        {children}
      </section>
    </main>
  );
}
