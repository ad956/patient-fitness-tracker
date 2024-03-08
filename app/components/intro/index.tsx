import { Button, Card, Image } from "@nextui-org/react";
import React from "react";

export default function Intro() {
  return (
    <section className="h-5/6 p-5 flex justify-center gap-10 items-center">
      <div className="h-4/5 w-2/5 p-5 flex flex-col justify-center gap-10 items-center text-bold">
        <h3 className="text-4xl font-medium tracking-wide">
          The <span className="text-[#e95b7b]">New Era</span> of Healthcare
          Management
        </h3>

        <p className="text-md font-medium tracking-wider">
          The Patient Fitness Tracker introduces a new era of healthcare
          management, offering a comprehensive platform to streamline patient
          care, optimize operations, and enhance collaboration across medical
          facilities.
        </p>

        <Button
          className="self-start font-bold text-white/90 bg-[#e95b7b]"
          variant="flat"
          color="default"
          radius="lg"
          size="md"
        >
          Get Started
        </Button>
      </div>

      <Card
        shadow="lg"
        isBlurred
        radius="lg"
        className="h-5/6 w-2/5 p-5 flex justify-center items-center"
      >
        <Image isBlurred src="admin.png" height="auto" width="100%" />
      </Card>
    </section>
  );
}
