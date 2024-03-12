import { Card } from "@nextui-org/react";
import React from "react";

export default function Patient() {
	return (
		<section className="bg-[#f3f6fd] h-full flex gap-5 p-2 border2 border-violet-700">
			<Card shadow="lg" className="h-full flex flex-col w-3/5 p-10">
				<div className="flex justify-between items-center">
					<p className="text-lg font-bold">Dashboard</p>
					<p className="text-sm font-medium">March, 2024</p>
				</div>

				<div className="flex">
					<div className="flex flex-col">
						<p className="">10</p>
						<p className="">Pending</p>
					</div>
					<div className="flex flex-col">
						<p className="">10</p>
						<p className="">Completed</p>
					</div>
					<div className="flex flex-col">
						<p className="">10</p>
						<p className="">Upcoming</p>
					</div>
				</div>
			</Card>

			<div className="h-full w-2/5">ch</div>
		</section>
	);
}
