import { Card, Image } from "@nextui-org/react";
import React from "react";

export default function Features() {
  return (
    <section className="border-2 border-green-800 h-4/5 flex justify-center">
      <div className="h-5/6 w-2/5 flex flex-col items-center">
        <p className="text-2xl font-semibold self-center">Features</p>

        <div className="h-4/5 w-full flex flex-wrap gap-5 justify-center ">
          {/* isBlurred */}
          <Card
            isFooterBlurred
            radius="lg"
            className="h-3/5 w-2/5 p-5 flex flex-col gap-2 justify-center items-start"
          >
            <Image src="patient.svg" height={40} width={40} />
            <p className="text-xs text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ut
              itaque excepturi rem quidem atque, necessitatibus.
            </p>
          </Card>
          <Card
            isFooterBlurred
            radius="lg"
            className="h-3/5 w-2/5 p-5 flex flex-col gap-2 justify-center items-start"
          >
            <Image src="patient.svg" height={40} width={40} />
            <p className="text-xs text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ut
              itaque excepturi rem quidem atque, necessitatibus.
            </p>
          </Card>{" "}
          <Card
            isFooterBlurred
            radius="lg"
            className="h-3/5 w-2/5 p-5 flex flex-col gap-2 justify-center items-start"
          >
            <Image src="patient.svg" height={40} width={40} />
            <p className="text-xs text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ut
              itaque excepturi rem quidem atque, necessitatibus.
            </p>
          </Card>{" "}
          <Card
            isFooterBlurred
            radius="lg"
            className="h-3/5 w-2/5 p-5 flex flex-col gap-2 justify-center items-start"
          >
            <Image src="patient.svg" height={40} width={40} />
            <p className="text-xs text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ut
              itaque excepturi rem quidem atque, necessitatibus.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
