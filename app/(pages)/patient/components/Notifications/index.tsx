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
import { FcCloseUpMode, FcLikePlaceholder, FcMms } from "react-icons/fc";
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
      <PopoverContent className="max-w-xs">
        <div className="text-md font-bold self-start my-2">Notifications</div>
        <Listbox aria-label="Actions">
          <ListboxItem key="">
            <div className="flex flex-row justify-center items-center gap-5">
              <FcMms size={25} />

              <p className="font-bold text-[13px] text-wrap">
                Appointment confirmed! See you on{" "}
                <span className="text-danger">Apr 21, 2024</span> at{" "}
                <span className="text-danger">Apollo Hospitals</span>.
              </p>
            </div>
          </ListboxItem>
          <ListboxItem key="">
            <div className="flex flex-row justify-center items-center gap-5">
              <FcMms size={25} />
              <p className="font-bold text-[13px] text-wrap">
                Appointment confirmed! See you on{" "}
                <span className="text-danger">Apr 21, 2024</span> at{" "}
                <span className="text-danger">Apollo Hospitals</span>.
              </p>
            </div>
          </ListboxItem>
          <ListboxItem key="">
            <div className="flex flex-row justify-center items-center gap-5">
              <FcMms size={25} />

              <p className="font-bold text-[13px] text-wrap">
                Appointment confirmed! See you on{" "}
                <span className="text-danger">Apr 21, 2024</span> at{" "}
                <span className="text-danger">Apollo Hospitals</span>.
              </p>
            </div>
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
