import type { Metadata } from "next";
import { Sidebar, Header } from "./components";

export const metadata: Metadata = {
  title: "Patient Fitness Tracker - Admin",
  description: "Admin dashboard for Patient Fitness Tracker application.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <section className="flex flex-col h-screen  w-screen bg-gray-50 overflow-hidden p-5">
        <Header />
        {children}
      </section>
    </main>
  );
}
