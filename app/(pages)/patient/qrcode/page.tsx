"use client";
import { Button, Card, Image, Link, User } from "@nextui-org/react";
import { useQRCode } from "next-qrcode";
import { MdOutlineFileDownload } from "react-icons/md";

export default function QRCode() {
	const { SVG } = useQRCode();
	return (
		<Card
			shadow="lg"
			className="h-full flex flex-row justify-around items-center"
		>
			<div className="h-4/5 w-2/6 flex flex-col justify-center gap-5 items-center">
				<User
					name="Anand Suthar"
					description={
						<Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
							@ad956
						</Link>
					}
					avatarProps={{
						src: "https://i.pravatar.cc/150?u=a04258114e29026302d",
					}}
				/>

				<div className="flex flex-col justify-center items-center gap-2">
					<p className="text-sm font-semibold">
						Instant Access to Medical Records via QR Codes
					</p>
					<p className="text-xs px-5">
						Empower patients with personalized QR codes, granting swift access
						to medical records for seamless interactions at hospitals.
					</p>
				</div>

				<Card
					isBlurred
					shadow="lg"
					radius="lg"
					className="h-2/5 w-3/6 p-5 flex flex-col justify-center items-center"
				>
					<SVG
						text="https://github.com/Bunlong/next-qrcode"
						options={{
							margin: 2,
							width: 180,
							color: {
								dark: "#000000",
								light: "#ffffff",
							},
						}}
					/>
				</Card>
				<Button
					color="primary"
					startContent={<MdOutlineFileDownload size={22} />}
					className=""
				>
					Download QR Code
				</Button>
			</div>
			{/* <div className="">first</div> */}
		</Card>
	);
}
