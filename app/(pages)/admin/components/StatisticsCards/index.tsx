import { Card, CardBody } from "@nextui-org/react";
import { TilesDataProp } from "@pft-types/index";
import {
  RiUserLine,
  RiTeamLine,
  RiHospitalLine,
  RiShieldUserLine,
} from "react-icons/ri";

type StatisticsCardsProps = {
  tilesData: TilesDataProp | null;
};

export default function StatisticsCards({ tilesData }: StatisticsCardsProps) {
  if (!tilesData) return null;

  const statistics = [
    {
      title: "Patients",
      value: tilesData.newPatients,
      icon: <RiUserLine className="h-8 w-8 text-blue-600" />,
      change: 10,
    },
    {
      title: "Doctors",
      value: tilesData.newDoctors,
      icon: <RiTeamLine className="h-8 w-8 text-green-600" />,
      change: 5,
    },
    {
      title: "Receptionists",
      value: tilesData.newReceptionists,
      icon: <RiShieldUserLine className="h-8 w-8 text-purple-600" />,
      change: -2,
    },
    {
      title: "Hospitals",
      value: tilesData.newHospitals,
      icon: <RiHospitalLine className="h-8 w-8 text-red-600" />,
      change: 8,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {statistics.map((stat, index) => (
        <Card
          key={index}
          className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold text-gray-700">
                {stat.title}
              </p>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p
              className={`text-sm mt-2 ${
                stat.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change >= 0 ? "↑" : "↓"} {Math.abs(stat.change)}% from last
              month
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}