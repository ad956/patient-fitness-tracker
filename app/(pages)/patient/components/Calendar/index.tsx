"use client";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { type DateFormatter, DayPicker } from "react-day-picker";
import styles from "./styles.module.css";
import { Card } from "@nextui-org/react";

type upcomingAppointmentProps = {
  upcomingAppointments: [
    {
      day: number;
      month: string;
      year: number;
    }
  ];
};

export default function Calendar({
  upcomingAppointments,
}: upcomingAppointmentProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [appointmentDates, setAppointmentDates] = React.useState<Date[]>([]);

  React.useEffect(() => {
    if (upcomingAppointments && upcomingAppointments.length > 0) {
      const selectedDates = upcomingAppointments.map((appointment) => {
        const { day, month, year } = appointment;
        return new Date(year, getMonthIndex(month), day);
      });
      setAppointmentDates(selectedDates);
      // Select the first appointment date by default
      setSelectedDate(selectedDates[0]);
    } else {
      setAppointmentDates([]);
      setSelectedDate(undefined);
    }
  }, [upcomingAppointments]);
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

  const dayPickerStyle = `h-full w-3/5 ${styles.day_input} ${styles.day_button} ${styles.dialog_sheet} ${styles.bg_white} ${styles.dark_gray} ${styles.black} ${styles.white} ${styles.bg_near_black} ${styles.bg_near_white} ${styles.rdp} ${styles.ba}`;
  return (
    <Card className="bg-[#111] w-full h-full flex flex-row justify-around items-center p-5">
      <DayPicker
        mode="single"
        showOutsideDays
        fromYear={2024}
        selected={selectedDate}
        onSelect={setSelectedDate}
        className={dayPickerStyle}
        formatters={{ formatCaption }}
        disabled
      />
      <div>
        {appointmentDates.length > 0 ? (
          <ul className="text-white/80 text-md font-medium">
            {appointmentDates.map((date, index) => (
              <li key={index}>{format(date, "LLLL dd, yyyy")}</li>
            ))}
          </ul>
        ) : (
          <p className="text-white/80 text-md font-medium">Please wait.</p>
        )}
      </div>
    </Card>
  );
}
