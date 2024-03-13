"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

const data = [
	{
		id: "Patient A",
		data: [
			{ x: "Jan", y: 40 },
			{ x: "Feb", y: 70 },
			{ x: "Mar", y: 90 },
			{ x: "Apr", y: 60 },
			{ x: "May", y: 50 },
			{ x: "Jun", y: 80 },
			{ x: "Jul", y: 95 },
			{ x: "Aug", y: 45 },
			{ x: "Sep", y: 85 },
			{ x: "Oct", y: 70 },
			{ x: "Nov", y: 88 },
			{ x: "Dec", y: 75 },
		],
	},
];

const years = [
	{
		label: "2020",
		year: 2020,
	},
	{
		label: "2021",
		year: 2021,
	},
	{
		label: "2022",
		year: 2022,
	},
	{
		label: "2023",
		year: 2023,
	},
	{
		label: "2024",
		year: 2024,
	},
];

const HealthConditions = () => {
	return (
		<div className="h-full w-full p-5">
			<div className="flex flex-row justify-between items-center">
				<p className="text-md font-semibold">Your Health Conditions</p>

				<Select
					color="primary"
					labelPlacement="outside-left"
					className="w-1/6"
					defaultSelectedKeys={["2024"]}
				>
					{years.map((year) => (
						<SelectItem key={year.year} value={year.year}>
							{year.label}
						</SelectItem>
					))}
				</Select>
			</div>
			<ResponsiveLine
				data={data}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: "point" }}
				yScale={{ type: "linear", min: 0, max: 100 }}
				curve="catmullRom"
				axisTop={null}
				axisRight={null}
				enableGridX={false}
				enableGridY={false}
				colors={["#0070f0"]}
				lineWidth={2}
				pointSize={8}
				pointColor={{ theme: "grid.line.stroke" }}
				pointBorderWidth={2}
				pointBorderColor={{ from: "serieColor" }}
				axisLeft={{
					tickValues: [0, 25, 50, 75, 100],
					legendOffset: -40,
					legendPosition: "middle",
				}}
				useMesh={true}
			/>
		</div>
	);
};

const WeeklyData = [
	{
		id: "Monday",
		data: [{ x: "Monday", y: 80 }],
	},
	{
		id: "Tuesday",
		data: [{ x: "Tuesday", y: 60 }],
	},
	{
		id: "Wednesday",
		data: [{ x: "Wednesday", y: 40 }],
	},
	{
		id: "Thursday",
		data: [{ x: "Thursday", y: 70 }],
	},
	{
		id: "Friday",
		data: [{ x: "Friday", y: 90 }],
	},
	{
		id: "Saturday",
		data: [{ x: "Saturday", y: 50 }],
	},
	{
		id: "Sunday",
		data: [{ x: "Sunday", y: 30 }],
	},
];

const WeeklyProgress = () => {
	return (
		<ResponsiveRadialBar
			data={WeeklyData}
			valueFormat=">-.2f"
			padding={0.4}
			cornerRadius={2}
			margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
			radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
			circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
			legends={[
				{
					anchor: "right",
					direction: "column",
					justify: false,
					translateX: 80,
					translateY: 0,
					itemsSpacing: 6,
					itemDirection: "left-to-right",
					itemWidth: 100,
					itemHeight: 18,
					itemTextColor: "#999",
					symbolSize: 18,
					symbolShape: "square",
					effects: [
						{
							on: "hover",
							style: {
								itemTextColor: "#000",
							},
						},
					],
				},
			]}
		/>
	);
};

export { WeeklyProgress, HealthConditions };
