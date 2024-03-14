"use client";
import { format } from "date-fns";
import React from "react";
import { type DateFormatter, DayPicker } from "react-day-picker";
import styles from "./styles.module.css";
import { Card } from "@nextui-org/react";

export default function Calendar() {
	const [selected, setSelected] = React.useState<Date>();

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
		<Card className="bg-[#111111] w-full h-full flex flex-row justify-around items-center p-5">
			<DayPicker
				mode="single"
				showOutsideDays
				fromYear={2024}
				selected={selected}
				onSelect={setSelected}
				className={dayPickerStyle}
				formatters={{ formatCaption }}
			/>
			<p className="text-white/80 text-md font-medium">
				{selected ? format(selected, "LLLL dd, yyyy") : "Please pick a day."}
			</p>
		</Card>
	);
}
