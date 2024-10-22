"use client";

import React from "react";
import {
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FiFileText, FiMessageCircle, FiYoutube } from "react-icons/fi";

const PatientTabs = () => {
  const bills = [
    {
      id: "BL-001",
      date: "2024-10-15",
      service: "General Consultation",
      amount: 150,
    },
    { id: "BL-002", date: "2024-10-15", service: "Blood Test", amount: 75 },
    { id: "BL-003", date: "2024-10-16", service: "X-Ray", amount: 200 },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      status: "online",
    },
    {
      id: 2,
      name: "Dr. James Miller",
      specialty: "Neurologist",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      status: "offline",
    },
  ];

  const labResults = [
    {
      id: "LR-001",
      test: "Complete Blood Count",
      date: "2024-10-14",
      status: "Completed",
    },
    {
      id: "LR-002",
      test: "Lipid Profile",
      date: "2024-10-15",
      status: "Pending",
    },
    {
      id: "LR-003",
      test: "Thyroid Function",
      date: "2024-10-16",
      status: "Processing",
    },
  ];

  return (
    <div className="w-full h-full rounded-lg shadow-sm">
      <Tabs
        aria-label="Patient Services"
        color="primary"
        variant="light"
        classNames={{
          base: "w-full h-full",
          tabList: "gap-6 relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary/20",
          tab: "max-w-fit px-4 h-12",
          tabContent: "group-data-[selected=true]:text-primary font-medium",
        }}
      >
        <Tab
          key="bills"
          title={
            <div className="flex items-center gap-2">
              <FiFileText className="text-primary" size={18} />
              <span>Bills</span>
            </div>
          }
        >
          <div className="p-4">
            <Table
              aria-label="Recent Bills"
              classNames={{
                wrapper: "shadow-none",
                // th: "bg-transparent text-xs text-default-500 font-medium",
                td: "py-3 text-sm",
              }}
            >
              <TableHeader>
                <TableColumn>BILL ID</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>SERVICE</TableColumn>
                <TableColumn>AMOUNT</TableColumn>
              </TableHeader>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell>{bill.service}</TableCell>
                    <TableCell className="text-primary font-medium">
                      ${bill.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Tab>

        <Tab
          key="doctors"
          title={
            <div className="flex items-center gap-2">
              <FiMessageCircle className="text-primary" size={18} />
              <span>Doctors</span>
            </div>
          }
        >
          <div className="flex flex-col gap-3 p-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-4 bg-default-50 rounded-lg hover:bg-default-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar
                    src={doctor.avatar}
                    className="ring-2 ring-primary/20"
                    size="md"
                  />
                  <div>
                    <p className="text-sm font-semibold">{doctor.name}</p>
                    <p className="text-xs text-default-500">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        doctor.status === "online"
                          ? "bg-success"
                          : "bg-default-300"
                      }`}
                    />
                    <span className="text-xs text-default-500">
                      {doctor.status}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="font-medium"
                  >
                    Chat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Tab>

        <Tab
          key="lab"
          title={
            <div className="flex items-center gap-2">
              <FiYoutube className="text-primary" size={18} />
              <span>Lab Results</span>
            </div>
          }
        >
          <div className="p-4">
            <Table
              aria-label="Lab Results"
              classNames={{
                wrapper: "shadow-none",
                th: "bg-transparent text-xs text-default-500 font-medium",
                td: "py-3 text-sm",
              }}
            >
              <TableHeader>
                <TableColumn>TEST ID</TableColumn>
                <TableColumn>TEST NAME</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {labResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.id}</TableCell>
                    <TableCell>{result.test}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          result.status === "Completed"
                            ? "bg-success-50 text-success-600"
                            : result.status === "Pending"
                            ? "bg-warning-50 text-warning-600"
                            : "bg-primary-50 text-primary-600"
                        }`}
                      >
                        {result.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PatientTabs;
