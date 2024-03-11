"use client";
import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import { CiHospital1 } from "react-icons/ci";
import { GrSchedules } from "react-icons/gr";
import { TbHealthRecognition } from "react-icons/tb";

export default function Solutions() {
	return (
		<section className="h-full flex	justify-around items-center">
			<div className="h-3/5 w-4/5">
				<div className=" container mx-auto">
					<h2 className="text-3xl font-bold mb-4">Solutions</h2>
					<p className="text-lg mb-4">
						Explore our comprehensive solutions designed to address the diverse
						needs of healthcare management:
					</p>
					<Accordion variant="bordered" className="">
						{solutionDetails.map((item, index) => (
							<AccordionItem
								key={item.title}
								startContent={setAccordionIcon(index)}
								title={item.title}
							>
								<p className="text-md text-black/90 ml-2">{item.desc}</p>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}

const solutionDetails = [
	{
		title: "Patient Management",
		desc: "The 'Patient Management' solution within our project encompasses a comprehensive system for effectively managing patient information, including demographics, medical history, and treatment plans. It allows healthcare providers to maintain accurate records of patient consultations, diagnoses, and prescribed treatments, facilitating seamless communication and collaboration between healthcare professionals. Additionally, patients can access their medical records securely, view upcoming appointments, and communicate with their healthcare team through the platform, empowering them to take an active role in their healthcare journey. This solution streamlines administrative tasks, enhances patient care coordination, and improves overall healthcare delivery efficiency.",
	},
	{
		title: "Appointment Scheduling",
		desc: "Our 'Appointment Scheduling' solution offers an intuitive and user-friendly interface for patients to schedule appointments with healthcare providers conveniently. Patients can view the availability of healthcare professionals, select a preferred date and time for their appointment, and receive confirmation of their scheduled visit. Healthcare providers benefit from streamlined appointment management, with automated reminders sent to both patients and staff, reducing no-show rates and improving overall clinic efficiency. Additionally, the system supports the rescheduling and cancellation of appointments, ensuring flexibility and convenience for patients and healthcare providers alike. This solution optimizes appointment booking processes, minimizes scheduling conflicts, and enhances patient satisfaction.",
	},
	{
		title: "Health Monitoring",
		desc: "The 'Health Monitoring' solution integrates wearable devices and health tracking applications to collect and analyze patient health data in real-time. It enables healthcare providers to monitor patients' vital signs, physical activity, and other health metrics remotely, facilitating early detection of health issues and proactive intervention when necessary. Patients can securely share their health data with their healthcare team, allowing for personalized health assessments and treatment recommendations. By empowering patients to actively monitor their health and engage in preventive care measures, the Health Monitoring solution promotes better health outcomes and enhances the overall patient experience. This solution leverages cutting-edge technology to monitor patient health status continuously, providing actionable insights for healthcare decision-making and improving patient outcomes.",
	},
];

function setAccordionIcon(index: number) {
	switch (index) {
		case 0:
			return <CiHospital1 size={20} />;
		case 1:
			return <GrSchedules size={20} />;
		case 2:
			return <TbHealthRecognition size={20} />;
	}
}
