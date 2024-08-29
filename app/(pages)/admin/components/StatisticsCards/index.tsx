import { Card, CardBody } from "@nextui-org/react";
import {
  RiUserLine,
  RiTeamLine,
  RiCalendarLine,
  RiHospitalLine,
} from "react-icons/ri";

type TilesDataProp = {
  totalHospitals: string;
  totalPatients: string;
  totalDoctors: string;
  totalReceptionists: string;
};

type StatisticsCardsProps = {
  tilesData: TilesDataProp | null;
};

export default function StatisticsCards({ tilesData }: StatisticsCardsProps) {
  if (!tilesData) return null;

  const statistics = [
    {
      title: "Total Patients",
      value: tilesData.totalPatients,
      icon: <RiUserLine className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Total Doctors",
      value: tilesData.totalDoctors,
      icon: <RiTeamLine className="h-8 w-8 text-green-600" />,
    },
    {
      title: "Total Receptionists",
      value: tilesData.totalReceptionists,
      icon: <RiCalendarLine className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Total Hospitals",
      value: tilesData.totalHospitals,
      icon: <RiHospitalLine className="h-8 w-8 text-red-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {statistics.map((stat, index) => (
        <Card
          key={index}
          className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold text-gray-700">{stat.title}</p>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
