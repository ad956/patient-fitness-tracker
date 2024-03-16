import SpinnerLoader from "@/app/components/SpinnerLoader";
import { Progress } from "@nextui-org/react";

export default function loading() {
	return (
		<SpinnerLoader />
		/*
		<section className="h-full w-full grid place-items-center">
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
				label="General Health"
				value={82}
				showValueLabel={true}
			/>
		</section>
		*/
	);
}
