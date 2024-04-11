"use client";

import { Chip, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { GiLotus } from "react-icons/gi";

export default function PatientTabs() {
  const tabsData = [
    {
      key: "patient-waiting",
      title: "Waiting Patients",
      count: 5,
      data: "Efficiently manage patient records, including medical history, appointments, and treatment plans, ensuring accurate and up-to-date information is accessible to healthcare providers as needed.",
    },
    {
      key: "approved",
      title: "Approved Patients",
      count: 2,
      data: "Enable patients to schedule appointments online and receive reminders via email or SMS, reducing no-show rates and improving appointment adherence.",
    },
    {
      key: "patient-pending",
      title: "Pending Patients",
      count: 7,
      data: "Integrate with wearable devices and health tracking apps to collect and analyze patient health data, providing insights to both patients and healthcare providers for proactive management of health conditions.",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <Tabs aria-label="patients-tabs" variant="bordered" color="danger">
        {tabsData.map((item) => (
          <Tab
            key={item.key}
            title={
              <div className="flex items-center space-x-2">
                <GiLotus />
                <span className="text-xs">{item.title}</span>
                <Chip size="sm" variant="faded">
                  {item.count}
                </Chip>
              </div>
            }
          >
            {item.data}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
