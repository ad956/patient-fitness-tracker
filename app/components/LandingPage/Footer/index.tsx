"use client";

import { Button, Card, Divider, Image } from "@nextui-org/react";
import Link from "next/link";
import { TfiTwitter } from "react-icons/tfi";
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="lg:h-4/5 flex flex-col justify-center p-0 lg:p-5">
      <Card
        isBlurred
        shadow="lg"
        radius="lg"
        className="bg-[#1c1624] lg:h-full flex flex-col justify-evenly items-center gap-5"
      >
        <div className="flex flex-col-reverse lg:flex-row text-white w-full justify-around items-center">
          <div className="flex flex-col items-center lg:items-start mt-5 lg:my-0">
            <Image
              alt="meteor-gif"
              src="images/meteor.gif"
              height={100}
              width={100}
              className="mb-2"
            />
            <p className="text-xs font-light">
              © 2024 Syncure, Inc. All rights reserved.
            </p>
          </div>
          <FooterLinkItem />
        </div>
        <div className="flex flex-col justify-center items-center gap-5 w-3/5">
          <Image
            alt="brand-logo"
            src="/icons/patient.svg"
            height={40}
            width={40}
            className=""
          />
          <div className="hidden lg:flex text-center text-white/90">
            <p className="text-sm break-words">
              <span className="block sm:inline">
                Syncure is revolutionizing healthcare engagement with its
                comprehensive solution.
              </span>
              <span className="block sm:inline">
                Offering Push Notifications, Email, SMS, and In-App
                communication.
              </span>
            </p>
          </div>

          <div className="flex flex-row gap-5">
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={25} color="white" />
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={25} color="white" />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={25} color="white" />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TfiTwitter size={25} color="white" />
            </Link>
          </div>

          <div className="hidden lg:flex flex-row gap-5">
            <Button
              className=" bg-transparent text-white"
              as={Link}
              href="/legal"
            >
              Privacy
            </Button>
            <Button
              className=" bg-transparent text-white"
              as={Link}
              href="/legal"
            >
              Terms of Use
            </Button>
            <Button
              className=" bg-transparent text-white"
              as={Link}
              href="/legal"
            >
              Acceptable Use Policy
            </Button>
            <Button
              className=" bg-transparent text-white"
              as={Link}
              href="/legal"
            >
              Software Lifecycle Policy
            </Button>
          </div>
        </div>
      </Card>
    </footer>
  );
}

function FooterLinkItem() {
  const LinkItems = [
    {
      uri: "/solution",
      title: "Solutions",
      subtitle: [
        "Patient Management",
        "Appointment Scheduling",
        "Health Monitoring",
      ],
    },
    {
      uri: "/support",
      title: "Support",
      subtitle: ["Contact Us", "FAQs", "Documentation"],
    },
    {
      uri: "/company",
      title: "Company",
      subtitle: ["About Us", "Careers", "Blog"],
    },
    {
      uri: "/legal",
      title: "Legal",
      subtitle: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
    },
  ];

  return LinkItems.map((item) => (
    <div key={item.title} className="flex flex-row items-center lg:flex-col">
      <p className="hidden lg:flex text-md lg:mb-2 tracking-wide">
        {item.title}
      </p>
      {item.subtitle.map((content, index) => (
        <Link
          key={item.subtitle[index]}
          className="cursor-pointer text-xs lg:text-sm text-white/75 m-1 hover:text-gray-300"
          href={item.uri}
        >
          {content}
        </Link>
      ))}
    </div>
  ));
}
