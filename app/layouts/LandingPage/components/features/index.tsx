import { Card } from "@nextui-org/react";
import { projectFeatures } from "@/app/utils/constants";
import {
	MdOutlineManageAccounts,
	MdOutlineDocumentScanner,
	MdOutlineQrCodeScanner,
} from "react-icons/md";

import { CiCircleAlert } from "react-icons/ci";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "500", style: "normal", subsets: ["latin"] });

const renderIcon = (icon: string) => {
	switch (icon) {
		case "MdOutlineManageAccounts":
			return <MdOutlineManageAccounts size={40} />;
		case "MdOutlineDocumentScanner":
			return <MdOutlineDocumentScanner size={40} />;
		case "MdOutlineQrCodeScanner":
			return <MdOutlineQrCodeScanner size={40} />;
		case "CiCircleAlert":
			return <CiCircleAlert size={40} />;
		default:
			return null;
	}
};

export default function Features() {
	return (
		<section id="features" className="h-4/5 flex flex-col justify-center items-center gap-5 p-5">
			<div className="self-start ml-36">
				<p className={`text-3xl font-bold tracking-wide ${poppins.className}`}>
					Features
				</p>
				<div className="">
					Transform your healthcare experience with intuitive design and
					seamless functionality.
				</div>
			</div>

			<Card
				isBlurred
				radius="lg"
				className="h-3/5 w-4/5 flex flex-wrap gap-5 justify-center "
			>
				{projectFeatures.map((item) => (
					<div
						key={item.icon}
						className="h-2/5 w-2/5 p-5 flex  gap-2 justify-center items-cente"
					>
						{renderIcon(item.icon)}
						<div className="flex flex-col gap-2">
							<p className="text-lg text-black">{item.title}</p>
							<p className="text-sm text-gray-800">{item.description}</p>
						</div>
					</div>
				))}
			</Card>
		</section>
	);
}
