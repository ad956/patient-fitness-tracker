"use client";

import { Button, Image } from "@nextui-org/react";
import { IoQrCodeOutline, IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineCurrencyRupee,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { RiMenu5Fill } from "react-icons/ri";
import { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { CiHospital1 } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const [selected, setSelected] = useState(
    getInitialSelectedIndex(router.pathname)
  );

  function getInitialSelectedIndex(pathname: string) {
    const foundIndex = sidebarButtons.findIndex((item) =>
      pathname.includes(item.uri)
    );
    return foundIndex !== -1 ? foundIndex : 0;
  }

  function handleButtonClick(index: number) {
    setSelected(index);
  }

  const BaseURL = process.env.BASE_URL || "http://localhost:3000/";

  return (
    <aside className="h-full flex flex-col items-center p-4 bg-[#f3f6fd]">
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
    title: "Transactions",
    uri: "patient/transactions",
  },
  {
    title: "Hospitals",
    uri: "patient/hospitals",
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
