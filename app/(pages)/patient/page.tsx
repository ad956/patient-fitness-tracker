import { Avatar, Card, Divider, Spacer } from "@nextui-org/react";
import React from "react";

export default function Patient() {
	return (
		<section className="border- border-violet-700 bg-[#f3f6fd] h-full p-2">
			<div className="grid grid-cols-5 grid-rows-5 h-full gap-3">
				<Card className="row-span-3 justify-center items-center">
					<div className="flex flex-col items-center">
						<Avatar
							size="lg"
							src="https://i.pravatar.cc/150?u=a04258114e29026302d"
						/>
						<p className="text-sm font-semibold">Anand Suthar</p>
						<p className="text-xs text-gray-700">+91-8078-65-3427</p>
					</div>

					<div className="p-5 w-full text-sm font-semibold m-2 text-black/75 flex flex-col gap-2">
						<p className="self-center">Details</p>
						<Divider className="mx-2 w-full bg-black/10" />
						<div className="flex flex-row justify-between">
							<div className="flex flex-col gap-2">
								<p className="">Age :</p>
								<p className="">Blood Group :</p>
								<p className="">Height (f) :</p>
								<p className="">Weight (Kg) :</p>
							</div>
							<div className="flex flex-col items-end gap-2 font-bold text-black">
								<p className="">27 Year</p>
								<p className="">O+</p>
								<p className="">5.6</p>
								<p className="">60</p>
							</div>
						</div>
					</div>
				</Card>
				<Card className="col-span-1">2</Card>
				<Card className="col-span-1">3</Card>
				<Card className=" row-span-5 col-span-2">5</Card>
				<Card className="col-span-2 row-span-2">4</Card>
				<Card className=" row-span-2 col-span-3">6</Card>
			</div>
		</section>
	);
}
