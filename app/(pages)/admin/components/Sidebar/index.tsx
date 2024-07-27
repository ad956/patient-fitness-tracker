"use client";

import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import {
  FiCalendar,
  FiUser,
  FiBarChart2,
  FiSettings,
  FiGrid,
} from "react-icons/fi";

const Sidebar = () => (
  <aside className="h-screen flex-col border-r bg-white w-16 shadow-sm">
    <nav className="flex flex-col items-center gap-6 px-2 py-5">
      <Image
        src="/icons/patient.svg"
        height={35}
        width={35}
        alt="Patient Fitness Tracker"
      />
      <SidebarIcon icon={<FiGrid />} isActive />
      <SidebarIcon icon={<FiUser />} />
      <SidebarIcon icon={<FiCalendar />} />
      <SidebarIcon icon={<FiBarChart2 />} />
      <SidebarIcon icon={<FiSettings />} />
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
      <SidebarIcon icon={<FiUser />} href="/admin/settings" />
    </nav>
  </aside>
);

const SidebarIcon = ({ icon, isActive = false, href = "#" }: any) => (
  <Link
    href={href}
    className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-warning-100 text-warning-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    {React.cloneElement(icon, { className: "h-5 w-5" })}
  </Link>
);

export default Sidebar;
