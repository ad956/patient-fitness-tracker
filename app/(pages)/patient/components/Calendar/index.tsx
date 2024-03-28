"use client";
import { format } from "date-fns";
import React from "react";
import { type DateFormatter, DayPicker } from "react-day-picker";
import {
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

type upcomingAppointmentProps = {
  upcomingAppointments: [
    {
      date: string;
      state: string;
      city: string;
      hospital: string;
      disease: string;
      note: string;
      approved: string;
    }
  ];
};

export default function Calendar({
  upcomingAppointments,
}: upcomingAppointmentProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [appointmentDetail, setappointmentDetail] = React.useState("");
  const [appointmentDates, setAppointmentDates] = React.useState<Date[]>([]);

  React.useEffect(() => {
    if (upcomingAppointments && upcomingAppointments.length > 0) {
      const selectedDates = upcomingAppointments.map((appointment) => {
        return new Date(appointment.date);
      });
      console.log("ae bhalo pa ate :" + selectedDates);
      setAppointmentDates(selectedDates);
    } else {
      console.log("ae bhalo pa ate :(");
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
    const dayString = day.toDateString();
    const appointmentDatesString = appointmentDates.map((date) =>
      date.toDateString()
    );

    if (appointmentDatesString.includes(dayString)) {
      setappointmentDetail("abar dou ho");
      onOpen();
    } else {
      setappointmentDetail("");
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
            <ModalBody>
              <p>{appointmentDetail}</p>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </Card>
  );
}

function getMonthIndex(month: string): number {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.indexOf(month);
}
