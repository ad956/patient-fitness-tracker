"use client";

import { Button, Image } from "@nextui-org/react";
import { IoQrCodeOutline, IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineCurrencyRupee,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { CiHospital1 } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const [selected, setSelected] = useState(getInitialSelectedIndex(pathname));

  function getInitialSelectedIndex(pathname: string) {
    switch (pathname) {
      case "/patient/":
        return 0;
      case "/patient/qrcode":
        return 1;
      case "/patient/appointments":
        return 2;
      case "/patient/payments":
        return 3;
      case "/patient/medicalhistory":
        return 4;
      case "/patient/settings":
        return 5;
      default:
        return 0;
    }
  }

  function handleButtonClick(index: number) {
    setSelected(index);
  }

  const BaseURL = process.env.BASE_URL || "http://localhost:3000/";

  return (
    <aside className="hidden h-full md:flex flex-col items-center p-4 bg-[#f3f6fd]">
      <Image
        src="/patient.svg"
        alt="brand-logo"
        height={35}
        width={35}
        className="my-1"
      />
      <div className="flex flex-col justify-center gap-5 items-center my-20">
        {sidebarButtons.map((item, index) => (
          <Button
            key={item.title}
            href={`${BaseURL}${item.uri}`}
            isIconOnly
            as={Link}
            radius="full"
            variant="shadow"
            className={`${
              selected === index ? "bg-[#1f1c2e] text-white" : "bg-gray-100"
            }`}
            onClick={() => handleButtonClick(index)}
          >
            {setSidebarIcon(index)}
          </Button>
        ))}
      </div>
    </aside>
  );
}

const sidebarButtons = [
  {
    title: "Dashboard",
    uri: "patient/",
  },
  {
    title: "QR Code",
    uri: "patient/qrcode",
  },
  {
    title: "Appointment",
    uri: "patient/appointments",
  },
  {
    title: "Payments",
    uri: "patient/payments",
  },
  {
    title: "Medical History",
    uri: "patient/medicalhistory",
  },

  {
    title: "Settings",
    uri: "patient/settings",
  },
];

function setSidebarIcon(index: number) {
  switch (index) {
    case 0:
      return <MdOutlineSpaceDashboard size={22} />;
    case 1:
      return <IoQrCodeOutline size={22} />;
    case 2:
      return <AiOutlineSchedule size={22} />;
    case 3:
      return <MdOutlineCurrencyRupee size={22} />;
    case 4:
      return <CiHospital1 size={22} />;
    case 5:
      return <IoSettingsOutline size={22} />;

    default:
      break;
  }
}
