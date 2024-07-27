import type { Metadata } from "next";
import { Sidebar, Header } from "./components";
import { Admin } from "@types";
import { getAdminData } from "@lib/admin";

export const metadata: Metadata = {
  title: "Patient Fitness Tracker - Admin",
  description: "Admin dashboard for Patient Fitness Tracker application.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin: Admin = await getAdminData();

  return (
    <main className="h-screen flex flex-row">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Header admin={admin} />
        {children}
      </section>
    </main>
  );
}
