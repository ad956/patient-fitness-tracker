"use client";

import {
	Avatar,
	Card,
	CircularProgress,
	Divider,
	Progress,
	Skeleton,
} from "@nextui-org/react";
import React from "react";

const ProgressBar = ({ value }: { value: number }) => {
	return (
		<Progress
			size="sm"
			radius="sm"
			classNames={{
				base: "max-w-md",
				track: "drop-shadow-md border border-default",
				indicator: "bg-gradient-to-r from-yellow-500 to-pink-500",
				label: "tracking-wider font-bold text-xs",
				value: "text-foreground/60 text-xs",
			}}
			label="Loading"
			value={value}
			showValueLabel={true}
		/>
	);
};

export default function loading() {
	const [value1, setValue1] = React.useState(0);
	const [value2, setValue2] = React.useState(0);
	const [value3, setValue3] = React.useState(0);
	const [value4, setValue4] = React.useState(0);
	const [value5, setValue5] = React.useState(0);

	React.useEffect(() => {
		const interval1 = setInterval(() => {
			setValue1((v) => (v >= 100 ? 0 : v + 10));
		}, 500);

		const interval2 = setInterval(() => {
			setValue2((v) => (v >= 100 ? 0 : v + 10));
		}, 1000);

		const interval3 = setInterval(() => {
			setValue3((v) => (v >= 100 ? 0 : v + 10));
		}, 1500);
		const interval4 = setInterval(() => {
			setValue4((v) => (v >= 100 ? 0 : v + 10));
		}, 1500);
		const interval5 = setInterval(() => {
			setValue5((v) => (v >= 100 ? 0 : v + 10));
		}, 1500);

		return () => {
			clearInterval(interval1);
			clearInterval(interval2);
			clearInterval(interval3);
			clearInterval(interval4);
			clearInterval(interval5);
		};
	}, []);
	return (
		<section className="bg-[#f3f6fd] h-full p-2">
			<div className="grid grid-cols-5 grid-rows-5 h-full gap-3">
				<Card className="w-full row-span-3 space-y-5 p-4" radius="lg">
					<div className="flex flex-col items-center gap-2">
						<Skeleton className="flex rounded-full w-12 h-12" />

						<Skeleton className="w-4/5 rounded-lg">
							<div className="h-3 w-4/5 rounded-lg bg-default-200" />
						</Skeleton>
						<Skeleton className="w-2/5 rounded-lg">
							<div className="h-3 w-2/5 rounded-lg bg-default-300" />
						</Skeleton>
					</div>

					<Skeleton className="w-3/5 rounded-lg self-center">
						<div className="h-3 w-2/5 rounded-lg bg-default-300" />
					</Skeleton>
					<Skeleton className="rounded-lg">
						<div className="h-36 rounded-lg bg-default-300" />
					</Skeleton>
				</Card>
				<Card className="col-span-1 flex justify-center items-center">
					<CircularProgress
						aria-label="Loading..."
						size="lg"
						value={value1}
						color="primary"
						showValueLabel={true}
						className=""
					/>
				</Card>
				<Card className="col-span-1  flex justify-center items-center">
					<CircularProgress
						aria-label="Loading..."
						size="lg"
						value={value2}
						color="danger"
						showValueLabel={true}
						className=""
					/>
				</Card>
				<Card className=" row-span-5 col-span-2  flex justify-center items-center">
					<CircularProgress
						classNames={{
							svg: "w-32 h-32 drop-shadow-md",
						}}
						aria-label="Loading..."
						size="lg"
						strokeWidth={1}
						value={value3}
						showValueLabel={true}
						className=""
					/>
				</Card>
				<Card className="col-span-2 row-span-2  flex justify-center items-center">
					<ProgressBar value={value4} />
				</Card>
				<Card className=" row-span-2 col-span-3 flex justify-center items-center">
					<ProgressBar value={value5} />
				</Card>
			</div>
		</section>
	);
}
