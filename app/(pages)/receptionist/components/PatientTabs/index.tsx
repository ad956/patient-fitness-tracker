"use client";

import React from "react";
import { GiLotus } from "react-icons/gi";
import {
  Listbox,
  ListboxItem,
  Tabs,
  Tab,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { PatientDetails } from "@/types";

interface PatientTabsProps {
  pendingAppointments: { patientDetails: PatientDetails[] };
}

export default function PatientTabs({ pendingAppointments }: PatientTabsProps) {
  const tabsData = [
    {
      key: "patient-pending",
      title: "Pending Patients",
      count: pendingAppointments.patientDetails.length,
    },

    {
      key: "approved",
      title: "Approved Patients",
      count: pendingAppointments.patientDetails.length,
    },
    {
      key: "patient-waiting",
      title: "Waiting Patients",
      count: pendingAppointments.patientDetails.length,
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
                <Chip size="sm" variant="flat">
                  {item.count}
                </Chip>
              </div>
            }
          >
            <Listbox
              aria-label="Patient List"
              classNames={{
                list: "max-h-[500px] overflow-y-scroll scrollbar",
              }}
              items={pendingAppointments.patientDetails} // Accessing the patientDetails array
              variant="shadow"
            >
              {(patient) => (
                <ListboxItem
                  key={patient._id}
                  textValue={`${patient.firstname} ${patient.lastname}`}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={`${patient.firstname} ${patient.lastname}`}
                      className="flex-shrink-0"
                      size="sm"
                      src={patient.profile}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{`${patient.firstname} ${patient.lastname}`}</span>
                      <span className="text-tiny text-default-400">
                        {patient.email}
                      </span>
                    </div>
                  </div>
                </ListboxItem>
              )}
            </Listbox>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
