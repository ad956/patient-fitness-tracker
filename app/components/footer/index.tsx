"use client";

import {
	Button,
	Card,
	Divider,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { TfiTwitter } from "react-icons/tfi";
import {
	FaTwitter,
	FaLinkedin,
	FaFacebook,
	FaInstagram,
} from "react-icons/fa6";

export default function Footer() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<footer className="h-4/5 flex flex-col justify-center p-5">
			<Card
				isBlurred
				shadow="lg"
				radius="lg"
				className="bg-[#1c1624] h-full flex flex-col justify-center items-center gap-5"
			>
				<div className="">fi</div>
				<Divider className="bg-white/70 w-3/5" />
				<div className="flex flex-col justify-center items-center gap-5 w-3/5">
					<Image src="patient.svg" height={40} width={40} />
					<div className="text-center text-white/90">
						<p className="break-words">
							<span className="block sm:inline">
								Patient Fitness Tracker is revolutionizing healthcare engagement
								with its comprehensive solution.
							</span>
							<span className="block sm:inline">
								Offering Push Notifications, Email, SMS, and In-App
								communication.
							</span>
						</p>
					</div>

					<div className="flex flex-row gap-5">
						<FaLinkedin size={25} color="white" />
						<FaFacebook size={25} color="white" />
						<FaInstagram size={25} color="white" />
						<TfiTwitter size={25} color="white" />
					</div>

					<div className="flex flex-row  gap-5">
						<Button className=" bg-transparent text-white" onPress={onOpen}>
							Privacy
						</Button>
						<Button className=" bg-transparent text-white">Terms of Use</Button>
						<Button className=" bg-transparent text-white">
							Acceptable Use Policy
						</Button>
						<Button className=" bg-transparent text-white">
							Software Lifecycle Policy
						</Button>

						<Modal
							backdrop="opaque"
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							motionProps={{
								variants: {
									enter: {
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											ease: "easeOut",
										},
									},
									exit: {
										y: -20,
										opacity: 0,
										transition: {
											duration: 0.2,
											ease: "easeIn",
										},
									},
								},
							}}
						>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className="flex flex-col gap-1">
											Modal Title
										</ModalHeader>
										<ModalBody>
											<p>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Nullam pulvinar risus non risus hendrerit venenatis.
												Pellentesque sit amet hendrerit risus, sed porttitor
												quam.
											</p>
											<p>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Nullam pulvinar risus non risus hendrerit venenatis.
												Pellentesque sit amet hendrerit risus, sed porttitor
												quam.
											</p>
											<p>
												Magna exercitation reprehenderit magna aute tempor
												cupidatat consequat elit dolor adipisicing. Mollit dolor
												eiusmod sunt ex incididunt cillum quis. Velit duis sit
												officia eiusmod Lorem aliqua enim laboris do dolor
												eiusmod. Et mollit incididunt nisi consectetur esse
												laborum eiusmod pariatur proident Lorem eiusmod et.
												Culpa deserunt nostrud ad veniam.
											</p>
										</ModalBody>
										<ModalFooter>
											<Button color="danger" variant="light" onPress={onClose}>
												Close
											</Button>
											<Button color="primary" onPress={onClose}>
												Action
											</Button>
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
					</div>
				</div>
			</Card>
		</footer>
	);
}
