"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card } from "@nextui-org/react";
import { FaFileLines, FaMessage, FaFlask } from "react-icons/fa6";
import { DoctorChat, LabResult, PatientTabsKey } from "@pft-types/patient";
import SpinnerLoader from "@components/SpinnerLoader";
import ChatView, { DoctorsList } from "../DoctorChat";
import PendingBills from "../PendingBills";
import LabResults from "../LabResults";

const PatientTabs: React.FC = () => {
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

  const bills: any = [
    {
      id: "BL-001",
      date: "2024-10-15",
      service: "General Consultation",
      amount: 150,
    },
    { id: "BL-002", date: "2024-10-15", service: "Blood Test", amount: 75 },
    { id: "BL-003", date: "2024-10-16", service: "X-Ray", amount: 200 },
  ];

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
        return <PendingBills bills={bills} />;
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
    <Card className="w-full p-4">
      <Tabs
        aria-label="Patient Services"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        <Tab
          key="bills"
          title={
            <div className="flex items-center gap-2">
              <FaFileLines className="w-4 h-4" />
              <span className="hidden sm:inline">Bills & Payments</span>
            </div>
          }
        />
        <Tab
          key="doctors"
          title={
            <div className="flex items-center gap-2">
              <FaMessage className="w-4 h-4" />
              <span className="hidden sm:inline">My Doctors</span>
            </div>
          }
        />
        <Tab
          key="lab"
          title={
            <div className="flex items-center gap-2">
              <FaFlask className="w-4 h-4" />
              <span className="hidden sm:inline">Lab Results</span>
            </div>
          }
        />
      </Tabs>

      <div className="mt-4 h-[400px]">{renderContent()}</div>
    </Card>
  );
};

export default PatientTabs;
