"use client";

import { Image } from "@nextui-org/react";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => (
  <aside className="h-screen flex-col border-r bg-white w-16 shadow-sm">
    <nav className="flex flex-col items-center gap-6 px-2 py-5">
      <Image
        src="/icons/patient.svg"
        height={35}
        width={35}
        alt="Patient Fitness Tracker"
      />
      <Link
        href="#"
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-100 text-warning-600 hover:bg-blue-200"
      >
        <RxDashboard className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
      >
        <FaRegUserCircle className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
      >
        <CiCalendarDate className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
      >
        <HiOutlinePresentationChartBar className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
      >
        <IoSettingsOutline className="h-5 w-5" />
      </Link>
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
      <Link
        href="/admin/settings"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
      >
        <FaRegUserCircle className="h-5 w-5" />
      </Link>
    </nav>
  </aside>
);

export default Sidebar;
