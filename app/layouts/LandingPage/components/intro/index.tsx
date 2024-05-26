import { Button, Card, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Intro() {
  return (
    <section
      id="#home"
      className="lg:h-5/6 p-5 flex flex-col lg:flex-row justify-center lg:gap-10 items-center"
    >
      <div className="lg:h-4/5 lg:w-2/5 p-2 lg:p-5 flex flex-col justify-center gap-10 items-center text-bold">
        <h3 className="text-4xl font-medium tracking-wide">
          The <span className="text-[#e95b7b]">E</span> of Healthcare Management
        </h3>

        <p className="text-md font-medium tracking-wider">
          The Patient Fitness Tracker introduces a new era of healthcare
          management, offering a comprehensive platform to streamline patient
          care, optimize operations, and enhance collaboration across medical
          facilities.
        </p>

        <Button
          as={Link}
          className="self-start font-bold text-white/90 bg-[#e95b7b]"
          variant="flat"
          color="default"
          radius="lg"
          size="md"
          href="/signup"
        >
          Get Started
        </Button>
      </div>

      <Card
        shadow="lg"
        isBlurred
        radius="lg"
        className="lg:h-5/6 lg:w-2/5 p-5 flex justify-center items-center"
      >
        <Image
          alt="admin-illustration"
          isBlurred
          src="admin.png"
          height="auto"
          width="100%"
        />
      </Card>
    </section>
  );
}
