"use client";
import { Avatar, Card, Image } from "@nextui-org/react";
import { useQRCode } from "next-qrcode";

export default function QRCode() {
	const { SVG } = useQRCode();
	return (
		<Card
			shadow="lg"
			className="h-full flex flex-row justify-around items-center"
		>
			<div className="">first</div>
			<Card
				isBlurred
				radius="lg"
				className="flex flex-col items-center h-3/5 w-1/5"
			>
				{/* <div className=""></div> */}
				<Avatar
					size="lg"
					src="https://avatarfiles.alphacoders.com/347/347546.png"
				/>
				<SVG
					text="https://github.com/Bunlong/next-qrcode"
					options={{
						margin: 2,
						width: 150,
						color: {
							dark: "#000000",
							light: "#ffffff",
						},
					}}
				/>
			</Card>
		</Card>
	);
}
