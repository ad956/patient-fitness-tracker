"use client";

import { Button } from "@nextui-org/react";
import { IoQrCodeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiMenu5Fill } from "react-icons/ri";
import { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { CiHospital1 } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const [selected, setSelected] = useState(0);
	const pathname = usePathname();

	function handleButtonClick(index: number) {
		setSelected(index);
	}

	return (
		<aside className="border- border-red-700 h-full p-4 bg-[#f3f6fd]">
			{/* <RiMenu5Fill size={25} className="my-5" /> */}

			<div className="flex flex-col justify-center gap-5 items-center my-20">
				{sidebarButtons.map((item, index) => (
					<Button
						key={item.title}
						href={`${pathname}${item.uri}`}
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
		uri: "/",
	},
	{
		title: "QR Code",
		uri: "/qrcode",
	},
	{
		title: "Appointment",
		uri: "/appointments",
	},
	{
		title: "Hospitals",
		uri: "/hospitals",
	},

	{
		title: "Settings",
		uri: "/settings",
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
			return <CiHospital1 size={22} />;
		case 4:
			return <IoSettingsOutline size={22} />;

		default:
			break;
	}
}
