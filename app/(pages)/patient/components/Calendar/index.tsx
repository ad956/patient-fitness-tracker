"use client";
import { format } from "date-fns";
import React from "react";
import { DayPicker } from "react-day-picker";
import styles from "./styles.module.css";
export default function Calendar() {
	const [selected, setSelected] = React.useState<Date>();

	let footer = <p className="text-center text-gray-500">Please pick a day.</p>;
	if (selected) {
		footer = (
			<p className="text-center text-blue-500">
				You picked {format(selected, "PP")}.
			</p>
		);
	}

	const dayPickerStyle = `${styles.rdp_nav}${styles.day_input} ${styles.day_button} ${styles.dialog_sheet} ${styles.bg_white} ${styles.dark_gray} ${styles.black} ${styles.white} ${styles.bg_near_black} ${styles.bg_near_white} ${styles.rdp} ${styles.ba}`;
	return (
		<div className="w-4/5 p-5 h-4/5">
			<DayPicker
				mode="single"
				showOutsideDays
				// onDayClick={}
				fromYear={2024}
				selected={selected}
				onSelect={setSelected}
				footer={footer}
				className={dayPickerStyle}
			/>
		</div>
	);
}
