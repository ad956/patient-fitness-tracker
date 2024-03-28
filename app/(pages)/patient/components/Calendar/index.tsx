"use client";
import { format } from "date-fns";
import React from "react";
import { type DateFormatter, DayPicker } from "react-day-picker";
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
  // const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [appointmentDates, setAppointmentDates] = React.useState<Date[]>([]);

  React.useEffect(() => {
    if (upcomingAppointments && upcomingAppointments.length > 0) {
      const selectedDates = upcomingAppointments.map((appointment) => {
        const { day, month, year } = appointment;
        return new Date(year, getMonthIndex(month), day);
      });
      setAppointmentDates(selectedDates);
    } else {
      setAppointmentDates([]);
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

  function handleDayClick(day: Date): void {
    const dayString = day.toDateString();
    const appointmentDatesString = appointmentDates.map((date) =>
      date.toDateString()
    );

    if (appointmentDatesString.includes(dayString)) {
      console.log("hey", day.getDate());
    } else {
      console.log("nope");
    }
  }

  return (
    <Card className="bg-[#f5f5f5] w-full h-full flex flex-row justify-around items-center p-5">
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
        // disabled
      />
      <div>
        {appointmentDates.length > 0 ? (
          <ul className="text-black/80 text-md font-medium">
            {appointmentDates.map((date, index) => (
              <li key={index}>{format(date, "LLLL dd, yyyy")}</li>
            ))}
          </ul>
        ) : (
          <p className="text-black/80 text-md font-medium">Please wait.</p>
        )}
      </div>
    </Card>
  );
}
