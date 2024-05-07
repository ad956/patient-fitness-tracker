"use client";

import { bookedAppointments } from "@/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FaRegHospital } from "react-icons/fa6";
type upcomingAppointmentsType = {
  upcomingAppointments: bookedAppointments;
};

export default function Notifications({
  upcomingAppointments,
}: upcomingAppointmentsType) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      showArrow
      placement="bottom"
      size="lg"
      offset={10}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          size="sm"
          className="rounded-full bg-transparent md:bg-default"
        >
          <CiBellOn size={25} className="" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs">
        <div className="text-md font-bold self-start my-2">Notifications</div>
        <Listbox aria-label="Actions">
          {upcomingAppointments.map((item, index) => (
            <ListboxItem key={index} textValue={item._id}>
              <div className="flex flex-row justify-center items-center gap-5">
                <FaRegHospital size={25} />
                <p className="text-xs text-wrap">
                  Appointment confirmed! See you at{" "}
                  <span className="text-danger">{item.hospital.name}</span>.
                </p>
              </div>
            </ListboxItem>
          ))}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
