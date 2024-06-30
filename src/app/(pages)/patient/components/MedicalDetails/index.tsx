"use client";

import { MedicalHistory } from "@/src/types";
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

type MedicalDetailsProps = {
  medicalDetails: MedicalHistory[];
};

export default function MedicalDetails({
  medicalDetails,
}: MedicalDetailsProps) {
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
            medicalDetails.length === 0 ? (
              <div className="h-full w-full font-bold text-black/70 grid place-items-center">
                No medical history records available.
              </div>
            ) : (
              <Spinner className="" label="Loading..." color="warning" />
            )
          }
        >
          {medicalDetails.map((history, index) => (
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
