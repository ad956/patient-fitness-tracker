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
import { FcCloseUpMode } from "react-icons/fc";
type upcomingAppointmentsType = {
  upcomingAppointments: bookedAppointments;
};

export default function Notifications({
  upcomingAppointments,
}: upcomingAppointmentsType) {
  const [isOpen, setIsOpen] = React.useState(false);

  //
  const [appointmentDetail, setappointmentDetail] = React.useState<{
    date: string;
    timing: string;
    state: string;
    city: string;
    hospital: string;
    disease: string;
    note: string;
    approved: string;
    doctor: {
      name: string;
      profile: string;
      specialty: string;
    };
  } | null>(null);

  // React.useEffect(() => {
  //   if (upcomingAppointments && upcomingAppointments.length > 0) {
  //     const selectedDates = upcomingAppointments
  //       .filter((appointment) => appointment.approved === "approved")
  //       .map((approvedAppointment) => new Date(approvedAppointment.date));
  //     setappointmentDetail(selectedDates);
  //   } else {
  //     setappointmentDetail([]);
  //   }
  // }, [upcomingAppointments]);

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
        <Button isIconOnly size="sm" className="">
          <CiBellOn size={25} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="text-md font-bold self-start my-2">Notifications</div>
        <Listbox aria-label="Actions">
          <ListboxItem key="">
            <div className="flex flex-row justify-center items-center gap-5">
              <FcCloseUpMode size={25} />
              <p className="text-sm max-w-xs text-wrap">
                Your appointment request has been accepted! Join us on{" "}
                <span className="text-danger">21 Apr 2024</span> at{" "}
                <span className="text-danger">Apollo Hospitals</span> for your
                consultation.
              </p>
            </div>
          </ListboxItem>
          <ListboxItem key="">
            <div className="flex flex-row justify-center items-center gap-5">
              <FcCloseUpMode size={25} />
              <p className="text-sm max-w-xs text-wrap">
                Your appointment request has been accepted! Join us on{" "}
                <span className="text-danger">21 Apr 2024</span> at{" "}
                <span className="text-danger">Apollo Hospitals</span> for your
                consultation.
              </p>
            </div>
          </ListboxItem>
          <ListboxItem key="">
            <div className="flex flex-row justify-center items-center gap-5">
              <FcCloseUpMode size={25} />
              <p className="text-sm max-w-xs text-wrap">
                Your appointment request has been accepted! Join us on{" "}
                <span className="text-danger">21 Apr 2024</span> at{" "}
                <span className="text-danger">Apollo Hospitals</span> for your
                consultation.
              </p>
            </div>
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
