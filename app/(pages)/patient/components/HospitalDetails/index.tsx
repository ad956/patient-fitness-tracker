"use client";

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

interface DetailsType {
  Hospital: string;
  Doctor: string;
  StartDate: string;
  EndDate: string;
  TreatmentStatus: "Completed" | "Ongoing";
  Disease: string;
  Image: string;
}

export default function HospitalDetails() {
  const [details, setDetails] = useState<DetailsType[]>([]);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/patient/hospitals"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        setDetails(data.hospitalsData);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    }

    fetchPayments();
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
          {details.map((detail, index) => (
            <TableRow key={index}>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: detail.Image,
                  }}
                  name={detail.Hospital}
                >
                  abc
                </User>
              </TableCell>
              <TableCell>{detail.Disease}</TableCell>
              <TableCell>{detail.StartDate}</TableCell>
              <TableCell>{detail.EndDate}</TableCell>
              <TableCell>{detail.Doctor}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  size="sm"
                  variant="dot"
                  color={`${
                    detail.TreatmentStatus === "Completed"
                      ? "success"
                      : "warning"
                  }`}
                >
                  {detail.TreatmentStatus}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
