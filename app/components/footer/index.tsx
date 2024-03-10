import { Card } from "@nextui-org/react";

export default function Footer() {
	return (
		<footer className="h-3/5 flex flex-col justify-center p-5">
			<Card isBlurred shadow="lg" radius="lg" className="bg-[#1c1624] h-full">
				<p className="text-white text-2xl font-semibold">
					Patient Fitness Tracker
				</p>
			</Card>
		</footer>
	);
}
