import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Button, Card, Input } from "@nextui-org/react";
import "./style.css";

export default function ContactUS() {
	return (
		<section id="contact" className="h-full flex flex-col justify-center gap-5 items-center">
			<div className="flex flex-col gap-2 items-center">
				<p className="text-3xl font-bold">Get In Touch</p>
				<p className="text-sm text-gray-500">
					Reach out to us effortlessly through our contact form, and let us
					assist you with any inquiries or support needs you may have.
				</p>
			</div>

			<Card
				isBlurred
				shadow="lg"
				className="flex flex-row items-center gap-5 h-3/5 w-3/5 p-2"
			>
				<Card
					isBlurred
					shadow="lg"
					className="contact-bg text-white/85 flex flex-col justify-center p-5 gap-5 h-full w-2/6"
				>
					<p className="text-xl font-semibold">Contact Information</p>
					<p className="text-xs font-light">
						Feel free to get in touch with us at any time for assistance,
						inquiries, or collaboration opportunities.
					</p>

					<div className="flex gap-2 items-center">
						<IoIosCall />
						<div className="flex flex-col">
							<p className="text-xs">+917094566934</p>
							<p className="text-xs">+919457091234</p>
						</div>
					</div>
					<div className="flex gap-2 items-center">
						<MdEmail />
						<p className="text-xs">support@patienthealthcare.com</p>
					</div>
					<div className="flex gap-2 items-center">
						<FaLocationDot />
						<p className="text-xs">Gujarat,India</p>
					</div>
				</Card>
				<div className="flex flex-col justify-center p-5 gap-10 h-full w-3/5">
					<div className="flex gap-5">
						<Input
							isRequired
							type="text"
							label="Your Name"
							placeholder="John Doe"
							className="max-w-xs"
							variant="underlined"
						/>
						<Input
							isRequired
							type="email"
							label="Your Email"
							placeholder="johndoe@gmail.com"
							className="max-w-xs"
							variant="underlined"
						/>
					</div>
					<Input
						isRequired
						type="text"
						label="Your Subject"
						placeholder="Here goes your subject"
						className="max-w-lg"
						variant="underlined"
					/>
					<Input
						isRequired
						type="text"
						label="Message"
						placeholder="Write your message"
						className="max-w-lg"
						variant="underlined"
					/>

					<Button
						className="self-start font-bold text-white/90 bg-[#e95b7b]"
						variant="shadow"
						color="default"
						radius="lg"
						size="md"
					>
						Send Message
					</Button>
				</div>
			</Card>
		</section>
	);
}
