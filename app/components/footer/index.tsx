import { Card, Divider, Image } from "@nextui-org/react";
import { TfiTwitter } from "react-icons/tfi";
import {
	FaTwitter,
	FaLinkedin,
	FaFacebook,
	FaInstagram,
} from "react-icons/fa6";

export default function Footer() {
	return (
		<footer className="h-4/5 flex flex-col justify-center p-5">
			<Card
				isBlurred
				shadow="lg"
				radius="lg"
				className="bg-[#1c1624] h-full flex flex-col justify-center items-center"
			>
				<div className="">fi</div>
				<Divider className="bg-white/70 w-3/5" />
				<div className="flex flex-col justify-center items-center">
					<Image src="patient.svg" height={50} width={50} />
					<p className="text-white/90">
						Patient Fitness Tracker is revolutionizing healthcare engagement
						through its comprehensive solution, encompassing Push Notifications,
						Email, SMS, and In-App communication.
					</p>

					<div className="flex flex-row gap-5">
						<FaLinkedin size={25} color="white" />
						<FaFacebook size={25} color="white" />
						<FaInstagram size={25} color="white" />
						<TfiTwitter size={25} color="white" />
					</div>

					<div className="flex flex-row text-white">
						<p className="">Privacy</p>
						<p className="">Terms of Use</p>
						<p className="">Acceptable Use Policy</p>
						<p className="">Software Lifecycle Policy</p>
					</div>
				</div>
			</Card>
		</footer>
	);
}
