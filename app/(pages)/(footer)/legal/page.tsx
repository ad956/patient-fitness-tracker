"use client";
import {
	Accordion,
	AccordionItem,
	Card,
	Divider,
	Link,
} from "@nextui-org/react";
import { FcPrivacy, FcServices } from "react-icons/fc";

export default function Legal() {
	return (
		<section className="h-full flex	justify-around items-center">
			<div className="w-4/5">
				<div className=" container mx-auto">
					<h2 className="text-3xl font-bold mb-4">Company</h2>
					<p className="text-lg mb-4">
						Learn more about our company and stay updated with the latest news
						and career opportunities:
					</p>
					<Accordion variant="bordered" className="overflow-y-scroll">
						{legalDetails.map((item, index) => (
							<AccordionItem
								key={item.title}
								startContent={setAccordionIcon(index)}
								title={item.title}
							>
								<p className="text-md text-black/90 ml-2">{item.desc}</p>
								{index === 0 ? (
									<TermsOfService />
								) : index === 1 ? (
									<CookiePolicy />
								) : (
									<PrivacyPolicy />
								)}
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}

const legalDetails = [
	{
		title: "Terms of Service",
		desc: "Review our terms of service to understand the terms and conditions governing the use of our platform and services. By using our platform, you agree to abide by these terms, which outline the rights, responsibilities, and obligations of both users and the company.",
	},
	{
		title: "Privacy Policy",
		desc: "Our privacy policy outlines how we collect, use, and protect your personal information when you use our platform and services. We are committed to maintaining the confidentiality and security of your data and ensuring compliance with relevant data protection laws and regulations.",
	},
	{
		title: "Cookie Policy",
		desc: "Learn more about how we use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content and advertisements. Our cookie policy explains your choices regarding cookies and provides information on managing your cookie preferences.",
	},
];

function setAccordionIcon(index: number) {
	switch (index) {
		case 0:
			return <FcServices size={20} />;
		case 1:
			return <FcPrivacy size={20} />;
		case 2:
			return <FcPrivacy size={20} />;
	}
}

const TermsOfService = () => {
	return (
		<div className="p-5">
			<p className="text-lg font-semibold">Terms of Service</p>
			<Divider />
			<p className="mt-4">
				Welcome to Patient Fitness Tracker! These Terms of Service govern your
				use of our website and services. By accessing or using our platform, you
				agree to comply with these terms. Please read them carefully before
				using our services.
			</p>
			<p className="mt-4 font-semibold">1. User Responsibilities</p>
			<p className="mt-2">
				You are responsible for maintaining the confidentiality of your account
				credentials and for all activities that occur under your account. You
				agree not to use our services for any illegal or unauthorized purpose
				and to comply with all applicable laws and regulations.
			</p>
			<p className="mt-4 font-semibold">2. Prohibited Activities</p>
			<p className="mt-2">
				You agree not to engage in any of the following prohibited activities:
				<ul className="list-disc ml-8 mt-2">
					<li>Violating any laws or regulations;</li>
					<li>
						Interfering with or disrupting the integrity or performance of our
						platform;
					</li>
					<li>
						Attempting to gain unauthorized access to any portion of our
						platform;
					</li>
					<li>Impersonating another person or entity;</li>
					<li>
						Posting or transmitting any unlawful, threatening, abusive,
						defamatory, obscene, or offensive content;
					</li>
					<li>
						Using our platform for any commercial purpose without our prior
						written consent;
					</li>
					<li>
						Collecting or harvesting any information from our platform without
						our express written permission;
					</li>
				</ul>
			</p>
			<p className="mt-4 font-semibold">3. Intellectual Property Rights</p>
			<p className="mt-2">
				All content included on our platform, such as text, graphics, logos,
				images, audio clips, digital downloads, data compilations, and software,
				is the property of Patient Fitness Tracker or its content suppliers and
				protected by international copyright laws.
			</p>
		</div>
	);
};

const CookiePolicy = () => {
	return (
		<Card>
			<p className="">Cookie Policy</p>
			<Divider />
			<p className="">
				At Patient Fitness Tracker, we use cookies to improve your browsing
				experience and personalize content. By using our website, you consent to
				the use of cookies in accordance with this policy.
			</p>
			<p className="">1. What Are Cookies?</p>
			<p className="">
				Cookies are small text files that are placed on your computer or mobile
				device when you visit a website. They allow us to collect information
				about your browsing behavior and preferences.
			</p>
			{/* Add more sections as needed */}
		</Card>
	);
};

const PrivacyPolicy = () => {
	return (
		<Card>
			<p className="">Privacy Policy</p>
			<Divider />
			<p className="">
				Your privacy is important to us. This Privacy Policy explains how we
				collect, use, and disclose your personal information when you use our
				services. By using our platform, you consent to the collection, use, and
				disclosure of your personal information as described in this policy.
			</p>
			<p className="">1. Information We Collect</p>
			<p className="">
				We collect information that you provide to us when you register an
				account, use our services, or interact with our platform. This may
				include your name, email address, and other contact information.
			</p>
			{/* Add more sections as needed */}
		</Card>
	);
};
