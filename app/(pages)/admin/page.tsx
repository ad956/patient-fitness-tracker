"use client";

import Link from "next/link";
import {
  Button,
  Card,
  Input,
  Dropdown,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import {
  RiDashboardLine,
  RiUserLine,
  RiCalendarLine,
  RiBarChartLine,
  RiSettings4Line,
  RiMenuLine,
  RiAddLine,
  RiCheckLine,
  RiBuilding2Line,
  RiHospitalLine,
  RiTeamLine,
} from "react-icons/ri";

export default function Admin() {
  return (
    <div className="flex flex-col overflow-y-scroll scrollbar">
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6">
            {[
              {
                title: "Total Patients",
                value: "1,234",
                icon: <RiUserLine className="h-8 w-8 text-blue-600" />,
              },
              {
                title: "Total Doctors",
                value: "234",
                icon: <RiTeamLine className="h-8 w-8 text-green-600" />,
              },
              {
                title: "Total Appointments",
                value: "5,678",
                icon: <RiCalendarLine className="h-8 w-8 text-purple-600" />,
              },
              {
                title: "Total Hospitals",
                value: "25",
                icon: <RiHospitalLine className="h-8 w-8 text-red-600" />,
              },
            ].map((stat, index) => (
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
          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b border-gray-200 p-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Recent Activity
              </h3>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-6">
                {[
                  {
                    icon: <RiUserLine className="h-5 w-5" />,
                    title: "New Patient Registered",
                    description: "John Doe registered as a new patient.",
                    time: "2 hours ago",
                    color: "bg-blue-100 text-blue-600",
                  },
                  {
                    icon: <RiCalendarLine className="h-5 w-5" />,
                    title: "Appointment Scheduled",
                    description:
                      "Dr. Jane Smith scheduled an appointment with Sarah Johnson.",
                    time: "1 day ago",
                    color: "bg-green-100 text-green-600",
                  },
                  {
                    icon: <RiBarChartLine className="h-5 w-5" />,
                    title: "New Report Generated",
                    description:
                      "A new patient health report has been generated.",
                    time: "3 days ago",
                    color: "bg-purple-100 text-purple-600",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${activity.color}`}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.time}</p>
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
