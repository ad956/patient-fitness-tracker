"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import {
  RiUserLine,
  RiCalendarLine,
  RiAddLine,
  RiCheckLine,
  RiTeamLine,
  RiHospitalLine,
} from "react-icons/ri";
import { getTilesData } from "@lib/admin";

type TilesDataProp = {
  totalHospitals: string;
  totalPatients: string;
  totalDoctors: string;
  totalReceptionists: string;
};

type ActivityType =
  | "New Patient Registered"
  | "New Doctor Registered"
  | "New Hospital Registered"
  | "New Receptionist Registered";

type RecentUser = {
  title: ActivityType;
  description: string;
  timeSince: string;
};

type PaginatedResponse = {
  users: RecentUser[];
  page: number;
  totalPages: number;
  totalItems: number;
};

const activityIcons: Record<ActivityType, JSX.Element> = {
  "New Patient Registered": <RiUserLine className="h-5 w-5" />,
  "New Doctor Registered": <RiTeamLine className="h-5 w-5" />,
  "New Hospital Registered": <RiHospitalLine className="h-5 w-5" />,
  "New Receptionist Registered": <RiCalendarLine className="h-5 w-5" />,
};

const activityColors: Record<ActivityType, string> = {
  "New Patient Registered": "bg-blue-100 text-blue-600",
  "New Doctor Registered": "bg-green-100 text-green-600",
  "New Hospital Registered": "bg-red-100 text-red-600",
  "New Receptionist Registered": "bg-purple-100 text-purple-600",
};

export default function Admin() {
  const [tilesData, setTilesData] = useState<TilesDataProp | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    const fetchData = async () => {
      const tiles = await getTilesData();
      setTilesData(tiles);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchRecentUsers();
  }, [page]);

  const fetchRecentUsers = async () => {
    if (!hasMore) return;

    try {
      const response = await fetch(
        `/api/admin/dashboard/recent-users?page=${page}&limit=10`
      );
      const data: PaginatedResponse = await response.json();
      setRecentUsers((prev) => [...prev, ...data.users]);
      setHasMore(data.page < data.totalPages);
    } catch (error) {
      console.error("Error fetching recent users:", error);
    }
  };

  const statisticsCards = tilesData
    ? [
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
          title: "Total Appointments",
          value: tilesData.totalReceptionists,
          icon: <RiCalendarLine className="h-8 w-8 text-purple-600" />,
        },
        {
          title: "Total Hospitals",
          value: tilesData.totalHospitals,
          icon: <RiHospitalLine className="h-8 w-8 text-red-600" />,
        },
      ]
    : [];

  return (
    <div className="flex flex-col overflow-y-scroll scrollbar">
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6">
            {statisticsCards.map((stat, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-semibold text-gray-700">
                      {stat.title}
                    </p>
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="bg-white shadow-lg h-[400px]">
            <CardHeader className="border-b border-gray-200 p-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Recent Activity
              </h3>
            </CardHeader>
            <CardBody className="p-6 overflow-y-auto scrollbar">
              <div className="space-y-6">
                {recentUsers.map((user, index) => (
                  <div
                    key={index}
                    ref={
                      index === recentUsers.length - 1
                        ? lastUserElementRef
                        : null
                    }
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        activityColors[user.title]
                      }`}
                    >
                      {activityIcons[user.title]}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900">{user.title}</p>
                      <p className="text-sm text-gray-600">
                        {user.description}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{user.timeSince}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-6">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              startContent={<RiAddLine className="h-5 w-5" />}
            >
              Add Patient
            </Button>
            <Button
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              startContent={
                <RiCalendarLine className="h-5 w-5 text-gray-600" />
              }
            >
              Schedule Appointment
            </Button>
            <Button
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              startContent={<RiCheckLine className="h-5 w-5 text-gray-600" />}
            >
              Generate Report
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
