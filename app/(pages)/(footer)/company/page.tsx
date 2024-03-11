"use client";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import { FcAbout, FcServices, FcVoicePresentation } from "react-icons/fc";

export default function Company() {
	return (
		<section className="h-full flex	justify-around items-center">
			<div className="w-4/5">
				<div className=" container mx-auto">
					<h2 className="text-3xl font-bold mb-4">Company</h2>
					<p className="text-lg mb-4">
						Learn more about our company and stay updated with the latest news
						and career opportunities:
					</p>
					<Accordion variant="bordered" className="">
						{companyDetails.map((item, index) => (
							<AccordionItem
								key={item.title}
								startContent={setAccordionIcon(index)}
								title={item.title}
							>
								<p className="text-md text-black/90 ml-2">{item.desc}</p>
								{index !== 0 && <WillBeAvailable itemIndex={index} />}
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}

const companyDetails = [
	{
		title: "About Us",
		desc: "Learn more about our company's mission, values, and vision for revolutionizing healthcare through innovative technology solutions. Discover our journey, team members, and commitment to delivering exceptional products and services to our customers.",
	},
	{
		title: "Careers",
		desc: "Explore exciting career opportunities at our company and join a dynamic team of passionate individuals dedicated to making a difference in the healthcare industry. Discover roles in development, design, marketing, and more, and take the next step in your career with us.",
	},
	{
		title: "Blog",
		desc: "Stay updated with the latest news, insights, and trends in healthcare technology by reading our company blog. Explore articles, case studies, and thought leadership pieces written by our experts, and gain valuable knowledge to stay ahead in the rapidly evolving healthcare landscape.",
	},
];

function setAccordionIcon(index: number) {
	switch (index) {
		case 0:
			return <FcAbout size={20} />;
		case 1:
			return <FcServices size={20} />;
		case 2:
			return <FcVoicePresentation size={20} />;
	}
}

function WillBeAvailable(props: { itemIndex: number }) {
	return (
		<div className="flex flex-col justify-center items-center">
			<Image
				src="https://i.pinimg.com/originals/c0/34/17/c03417ebf4f447610528b07a704e0540.gif"
				height={200}
				width={200}
			/>

			<p className="text-2xl font-bold">
				{props.itemIndex === 1 ? (
					"Careers"
				) : props.itemIndex === 2 ? (
					"Blog"
				) : (
					<></>
				)}{" "}
				will be available soon ...
			</p>
		</div>
	);
}
