"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card } from "@nextui-org/react";
import { PatientTabsKey } from "@pft-types/patient";
import { Patient } from "@pft-types/index";
import DoctorChat from "../DoctorChat";
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
  const [selectedTab, setSelectedTab] = useState<PatientTabsKey>("bills");

  const patientInfo = {
    name: `${patient.firstname} ${patient.lastname}`,
    email: patient.email,
    contact: patient.contact,
  };

  const handleTabChange = (key: React.Key) => {
    setSelectedTab(key as PatientTabsKey);
  };

  return (
    <Card className="h-[95%] w-full px-4 py-2">
      <Tabs
        aria-label="Patient Services"
        color="primary"
        variant="underlined"
        selectedKey={selectedTab}
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
        >
          <PendingBills patient={patientInfo} />
        </Tab>

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
        >
          <DoctorChat />
        </Tab>

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
        >
          <LabResults />
        </Tab>
      </Tabs>
      <Toaster />
    </Card>
  );
}
