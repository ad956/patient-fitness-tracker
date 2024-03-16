"use client";

import {
	Card,
	CardFooter,
	Image,
	Button,
	Select,
	SelectItem,
} from "@nextui-org/react";
import React from "react";
import { CiHospital1 } from "react-icons/ci";
import { MdLocationCity } from "react-icons/md";

export default function Appointments() {
	return (
		<section className="h-full w-full flex flex-col gap-5  p-5">
			<Card
				isBlurred
				radius="lg"
				className="border-none flex flex-row justify-around items-center mx-5 bg-[#e95b7b"
			>
				<div className="flex flex-col gap-2">
					<div className="">
						<p className="text-2xl font-bold">
							Welcome to your appointment section,
						</p>
						<p className="text-2xl font-semibold">Anand!</p>
					</div>
					<p className="text-tiny text-black/80 my-2">
						To book an appointment, first, select your city. Then, choose a
						hospital within that city. Finally, provide your details to confirm
						the appointment.
					</p>
				</div>
				<Image
					alt="Appointment Booking Instuc"
					className="object-cover"
					height={200}
					src="/images/appointment1.png"
					width={200}
				/>
			</Card>

			<div className="flex flex-col justify-center gap-5 mx-5">
				<p className="text-lg font-bold">Book an appointment</p>

				<div className="flex flex-row items-center gap-5">
					<Select
						startContent={<MdLocationCity />}
						label="Select City"
						placeholder="Select your city"
						className="max-w-xs"
						variant="flat"
						color="danger"
					>
						{HospitalCities.map((item) => (
							<SelectItem key={item.city} value={item.city}>
								{item.city}
							</SelectItem>
						))}
					</Select>
					<Select
						startContent={<CiHospital1 />}
						label="Select Hospital"
						placeholder="Select your preferred hospital"
						className="max-w-xs"
						variant="flat"
						color="danger"
					>
						{HospitalCities.map((item) => (
							<SelectItem key={item.hospital} value={item.hospital}>
								{item.hospital}
							</SelectItem>
						))}
					</Select>
				</div>
			</div>
		</section>
	);
}

const HospitalCities = [
	{
		city: "Vadodara",
		hospital: "Appllo",
	},
	{
		city: "Vadodara",
		hospital: "Appllo",
	},
	{
		city: "Ahmedabad",
		hospital: "Fortis",
	},
	{
		city: "Ahmedabad",
		hospital: "Sterling",
	},
	{
		city: "Surat",
		hospital: "City Hospital",
	},
	{
		city: "Surat",
		hospital: "Kiran Hospital",
	},
	{
		city: "Rajkot",
		hospital: "Krishna Hospital",
	},
	{
		city: "Rajkot",
		hospital: "Apollo",
	},
	{
		city: "Gandhinagar",
		hospital: "Civil Hospital",
	},
	{
		city: "Gandhinagar",
		hospital: "Aditya Birla Hospital",
	},
];
