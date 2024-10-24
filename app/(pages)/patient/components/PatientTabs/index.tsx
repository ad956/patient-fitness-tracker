"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card } from "@nextui-org/react";
import { DoctorChat, LabResult, PatientTabsKey } from "@pft-types/patient";
import { Patient } from "@pft-types/index";
import SpinnerLoader from "@components/SpinnerLoader";
import ChatView, { DoctorsList } from "../DoctorChat";
import PendingBills from "../PendingBills";
import LabResults from "../LabResults";
import { Toaster } from "react-hot-toast";
import { IoFlaskOutline } from "react-icons/io5";
import { RiStethoscopeLine } from "react-icons/ri";
import { MdReceiptLong } from "react-icons/md";

interface PatientTabsProps {
  patient: Patient;
}

export default function PatientTabs({ patient }: PatientTabsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<PatientTabsKey>("bills");
  const [message, setMessage] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorChat | null>(null);

  const handleTabChange = (key: any) => {
    setIsLoading(true);
    setActiveTab(key);
    setSelectedDoctor(null);
    setTimeout(() => setIsLoading(false), Math.random() * 1000 + 500);
  };

  const patientInfo = {
    name: `${patient.firstname} ${patient.lastname}`,
    email: patient.email,
    contact: patient.contact,
  };

  const doctors: DoctorChat[] = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      avatar:
        "https://www.sketchappsources.com/resources/source-image/doctor-illustration-hamamzai.png",
      status: "online",
      lastMessage: "Your heart readings look normal. Keep up the good work!",
      lastMessageTime: "10:30 AM",
    },
    {
      id: 2,
      name: "Dr. James Miller",
      specialty: "Neurologist",
      avatar:
        "https://images.apollo247.in/doctors/noimagefemale.png?tr=q-80,f-auto,w-100,dpr-2.5,c-at_max%20250w",
      status: "offline",
      lastMessage: "We'll discuss your test results in our next appointment.",
      lastMessageTime: "Yesterday",
    },
  ];

  const labResults: LabResult[] = [
    {
      id: "LR-001",
      test: "Complete Blood Count",
      date: "2024-10-14",
      status: "Completed",
      result: "Normal",
    },
    {
      id: "LR-002",
      test: "Lipid Profile",
      date: "2024-10-15",
      status: "Pending",
      result: "Awaiting",
    },
    {
      id: "LR-003",
      test: "Thyroid Function",
      date: "2024-10-16",
      status: "Processing",
      result: "In Progress",
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return <SpinnerLoader />;
    }

    switch (activeTab) {
      case "bills":
        return <PendingBills patient={patientInfo} />;
      case "doctors":
        return selectedDoctor ? (
          <ChatView
            doctor={selectedDoctor}
            message={message}
            onMessageChange={setMessage}
            onBack={() => setSelectedDoctor(null)}
          />
        ) : (
          <DoctorsList doctors={doctors} onSelectDoctor={setSelectedDoctor} />
        );
      case "lab":
        return <LabResults results={labResults} />;
      default:
        return null;
    }
  };

  return (
    <Card className="h-[95%] w-full px-4 py-2">
      <Tabs
        aria-label="Patient Services"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
        classNames={{
          tabList:
            "gap-8 w-full relative rounded-none p-0 border-b border-gray-200",
          cursor: "w-full bg-gradient-to-r from-pink-500 to-indigo-600 h-0.5",
          tab: "max-w-fit px-2 h-12 transition-all duration-200",
          tabContent: "group-data-[selected=true]:text-pink-600 text-gray-500",
        }}
      >
        <Tab
          key="bills"
          title={
            <div className="flex items-center gap-3 py-1 group">
              <MdReceiptLong className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
              <span className="hidden sm:inline text-sm group-hover:text-indigo-500 transition-colors">
                Pending Bills
              </span>
            </div>
          }
        />
        <Tab
          key="doctors"
          title={
            <div className="flex items-center gap-3 py-1 group">
              <RiStethoscopeLine className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
              <span className="hidden sm:inline text-sm group-hover:text-indigo-500 transition-colors">
                My Doctors
              </span>
            </div>
          }
        />
        <Tab
          key="lab"
          title={
            <div className="flex items-center gap-3 py-1 group">
              <IoFlaskOutline className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
              <span className="hidden sm:inline text-sm group-hover:text-indigo-500 transition-colors">
                Lab Results
              </span>
            </div>
          }
        />
      </Tabs>

      <div className="mt-4 h-[400px]">{renderContent()}</div>
      <Toaster />
    </Card>
  );
}
