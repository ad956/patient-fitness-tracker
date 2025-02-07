import type { Metadata } from "next";
import { Sidebar, Header } from "./components";
import { getAdminData } from "@lib/admin";

export const metadata: Metadata = {
  title: "Syncure - Admin",
  description: "Admin dashboard for Syncure application.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin = await getAdminData();

  return (
    <main className="h-screen flex flex-row">
      <Sidebar />
      <section className="flex flex-col w-full overflow-hidden">
        <Header admin={admin} />
        {children}
      </section>
    </main>
  );
}
