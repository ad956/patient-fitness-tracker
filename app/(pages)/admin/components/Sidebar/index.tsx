"use client";

import { Link } from "@nextui-org/react";
import { CiCalendarDate, CiHospital1 } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

const Sidebar = ({ menuItems }: any) => (
  <aside className="fixed h-full w-14 flex-col border-r bg-white">
    <nav className="flex flex-col items-center gap-4 px-2 py-5">
      <Link
        href="#"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
      >
        <CiHospital1 className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-gray-700"
      >
        <RxDashboard className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-black"
      >
        <FaRegUserCircle className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-black"
      >
        <CiCalendarDate className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-black"
      >
        <HiOutlinePresentationChartBar className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-black"
      >
        <IoSettingsOutline className="h-5 w-5" />
      </Link>
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
      <Link
        href="#"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-black"
      >
        <FaRegUserCircle className="h-5 w-5" />
      </Link>
    </nav>
  </aside>
);

export default Sidebar;
