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
    <main className="h-screen flex flex-row">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Header />
        {children}
      </section>
    </main>
  );
}
