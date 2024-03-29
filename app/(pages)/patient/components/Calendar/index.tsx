"use client";
import { format } from "date-fns";
import React from "react";
import { type DateFormatter, DayPicker } from "react-day-picker";
import {
  Avatar,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { getFormattedDate } from "@/app/utils/getDate";
import { LuCalendarClock } from "react-icons/lu";
import { bookedAppointments } from "@/types";

// type upcomingAppointmentProps = {
//   upcomingAppointments: [
//     {
//       date: string;
//       timing: string;
//       state: string;
//       city: string;
//       hospital: string;
//       disease: string;
//       note: string;
//       approved: string;
//     }
//   ];
// };

export default function Calendar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const upcomingAppointments: bookedAppointments = [
    {
      date: "2024-03-30T15:59:59.094Z",
      timing: "02:25 PM - 03:00 PM",
      state: "Gujarat",
      city: "Vadodara",
      hospital: "Pearl Hospital",
      disease: "Common Cold",
      note: "I got common cold from yesterday.",
      approved: "approved",
      doctor_id: "660682d54e864f93f957de86",
    },
  ];

  const [appointmentDetail, setappointmentDetail] = React.useState<{
    date: string;
    timing: string;
    state: string;
    city: string;
    hospital: string;
    disease: string;
    note: string;
    approved: string;
  } | null>(null);

  const [appointmentDates, setAppointmentDates] = React.useState<Date[]>([]);

  React.useEffect(() => {
    if (upcomingAppointments && upcomingAppointments.length > 0) {
      const selectedDates = upcomingAppointments
        .filter((appointment) => appointment.approved === "approved")
        .map((approvedAppointment) => new Date(approvedAppointment.date));
      setAppointmentDates(selectedDates);
    } else {
      setAppointmentDates([]);
    }
  }, [upcomingAppointments]);

  const seasonEmoji: Record<string, string> = {
    winter: "⛄️",
    spring: "🌸",
    summer: "🌻",
    autumn: "🍂",
  };

  const getSeason = (month: Date): string => {
    const monthNumber = month.getMonth();
    if (monthNumber >= 0 && monthNumber < 3) return "winter";
    if (monthNumber >= 3 && monthNumber < 6) return "spring";
    if (monthNumber >= 6 && monthNumber < 9) return "summer";
    return "autumn";
  };

  const formatCaption: DateFormatter = (month, options) => {
    const season = getSeason(month);
    return (
      <>
        <span role="img" aria-label={season}>
          {seasonEmoji[season]}
        </span>{" "}
        {format(month, "LLLL", { locale: options?.locale })}
      </>
    );
  };

  function handleDayClick(day: Date): void {
    const dayString = getFormattedDate(day);

    const selectedAppointment = upcomingAppointments.find(
      (appointment) =>
        getFormattedDate(new Date(appointment.date)) === dayString
    );
    if (selectedAppointment) {
      setappointmentDetail(selectedAppointment);
      onOpen();
    } else {
      setappointmentDetail(null);
    }
  }

  return (
    <Card
      shadow="lg"
      className="bg-[#f5f5f5] w-full h-full flex flex-row justify-between items-center p-5"
    >
      <DayPicker
        mode="multiple"
        showOutsideDays
        fromYear={2024}
        selected={appointmentDates}
        onDayClick={handleDayClick}
        // onSelect={setSelectedDate}
        classNames={{
          day_outside: "text-black/30",
          button: "text-md px-2 py-1",
          nav: "inline-block bg-orange-70",
          nav_button: "bg-rose700 border- ",
          day_selected: "bg-danger/80 rounded-lg text-white",
        }}
        formatters={{ formatCaption }}
      />

      <p className="mx-auto text-black/80 text-md font-bold tracking-wide">
        Have a good
        <span className="text-danger ml-1">day</span>
      </p>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 font-bold">
              <p className="text-danger mx-2"> Appointment Details</p>
            </ModalHeader>
            <ModalBody className="flex flex-col items-start">
              <div className="flex flex-row w-full p-2 justify-around items-center ">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                  className="w-30 h-30 text-large"
                />
                <div className="flex flex-col justify-center items-start">
                  <div className="mb-2">
                    <p className="font-bold text-xl">John Doe</p>
                    <p className="font-bold text-black/80 text-sm">
                      Sr. Doctor
                    </p>
                  </div>

                  <div className="flex flex-row justify-center items-center gap-2">
                    <LuCalendarClock size={25} className="text-warning" />
                    <div className="flex flex-col">
                      <p className="font-bold text-black/80 text-md">
                        {appointmentDetail &&
                          getFormattedDate(new Date(appointmentDetail.date))}
                      </p>
                      <p className="font-bold text-black/70 text-sm">
                        {appointmentDetail?.timing}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <table className="border-collapse w-full mt-4">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="font-bold pr-4 py-2">Disease</td>
                    <td className="py-2">{appointmentDetail?.disease}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="font-bold pr-4 py-2">Hospital</td>
                    <td className="py-2">{appointmentDetail?.hospital}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="font-bold pr-4 py-2">Note</td>
                    <td className="py-2">{appointmentDetail?.note}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 py-2">City</td>
                    <td className="py-2">{appointmentDetail?.city}</td>
                  </tr>
                </tbody>
              </table>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </Card>
  );
}
