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
import { getFormattedDate } from "@/app/utils/getDate";

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

  const [appointmentDetail, setappointmentDetail] = React.useState<{
    date: string;
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
            <ModalBody>
              <p>
                <span className="font-bold">Date:</span>
                {appointmentDetail &&
                  getFormattedDate(new Date(appointmentDetail.date))}
              </p>
              <p>
                <span className="font-bold">Disease :</span>
                {appointmentDetail?.disease}
              </p>
              <p>
                <span className="font-bold">Hospital :</span>
                {appointmentDetail?.hospital}
              </p>
              <p>
                <span className="font-bold">Note :</span>
                {appointmentDetail?.note}
              </p>
              <p>
                <span className="font-bold">City :</span>
                {appointmentDetail?.city}
              </p>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </Card>
  );
}
