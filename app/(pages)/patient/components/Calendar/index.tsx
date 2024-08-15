"use client";
import { format } from "date-fns";
import React from "react";
import { type DateFormatter, DayPicker } from "react-day-picker";
import { Card, useDisclosure } from "@nextui-org/react";
import { getFormattedDate } from "@utils/getDate";
import { bookedAppointments } from "@types";
import AppointmentDetailsModal from "../AppointmentDetailsModal";

type upcomingAppointmentsType = {
  upcomingAppointments: bookedAppointments;
};

export default function Calendar({
  upcomingAppointments,
}: upcomingAppointmentsType) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [appointmentDetail, setappointmentDetail] = React.useState<{
    timing: {
      startTime: string;
      endTime: string;
    };
    state: string;
    city: string;
    hospital: {
      id: string;
      name: string;
    };
    disease: string;
    note: string;
    approved: string;
    doctor: {
      name: string;
      profile: string;
      specialty: string;
    };
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  const [appointmentDates, setAppointmentDates] = React.useState<Date[]>([]);

  React.useEffect(() => {
    if (upcomingAppointments && upcomingAppointments.length > 0) {
      const selectedDates = upcomingAppointments.map(
        (approvedAppointment) => new Date(approvedAppointment.createdAt)
      );
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
        getFormattedDate(new Date(appointment.createdAt)) === dayString
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
        classNames={{
          day_outside: "text-black/30",
          button: "text-md px-2 py-1",
          nav: "inline-block bg-orange-70",
          nav_button: "bg-rose700 border- ",
          day_selected: "bg-danger/80 rounded-lg text-white",
        }}
        formatters={{ formatCaption }}
      />

      <p className="hidden sm:flex md:hidden xl:flex mx-auto text-black/80 text-md font-bold tracking-wide">
        Have a good
        <span className="text-danger ml-1">day</span>
      </p>

      <AppointmentDetailsModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        appointmentDetail={appointmentDetail}
      />
    </Card>
  );
}
