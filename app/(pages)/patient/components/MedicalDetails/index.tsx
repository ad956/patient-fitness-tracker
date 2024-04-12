"use client";

import getPatientMedicalHistory from "@/lib/patient/getPatientMedicalHistory";
import { MedicalHistoryType } from "@/types";
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function MedicalDetails() {
  const [details, setDetails] = useState<MedicalHistoryType[]>([]);

  useEffect(() => {
    async function fetchMedicalHistory() {
      try {
        const response = await getPatientMedicalHistory();
        if (response.error) {
          throw new Error("Failed to fetch payments");
        }
        setDetails(response);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    }

    fetchMedicalHistory();
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <Table aria-label="Payment history" className="h/6">
        <TableHeader>
          <TableColumn>Hospital</TableColumn>
          <TableColumn>Disease</TableColumn>
          <TableColumn>Start Date</TableColumn>
          <TableColumn>End Date</TableColumn>
          <TableColumn>Doctor</TableColumn>
          <TableColumn>Treatment Status</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <Spinner className="" label="Loading..." color="warning" />
          }
        >
          {details.map((history, index) => (
            <TableRow key={index}>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: history.hospital.profile,
                  }}
                  name={history.hospital.name}
                >
                  abc
                </User>
              </TableCell>
              <TableCell>{history.disease}</TableCell>
              <TableCell>{history.start_date}</TableCell>
              <TableCell>{history.end_date}</TableCell>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: history.doctor.profile,
                  }}
                  name={history.doctor.name}
                >
                  abc
                </User>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  size="sm"
                  variant="dot"
                  color={`${
                    history.TreatmentStatus === "Completed"
                      ? "success"
                      : "warning"
                  }`}
                >
                  {history.TreatmentStatus}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
