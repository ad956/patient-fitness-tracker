"use client";

import { PaymentHistory } from "@/types";
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
import React from "react";

type paymentsPropType = {
  paymentHistory: PaymentHistory[];
};

export default function PaymentDeatils({ paymentHistory }: paymentsPropType) {
  return (
    <div className="h-full w-full flex flex-col">
      <Table aria-label="Payment history" className="h-5/6">
        <TableHeader>
          <TableColumn>Hospital</TableColumn>
          <TableColumn>Disease</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            paymentHistory.length === 0 ? (
              <div className="h-full w-full font-bold text-black/70 grid place-items-center">
                No payment history available yet.
              </div>
            ) : (
              <Spinner className="" label="Loading..." color="warning" />
            )
          }
        >
          {paymentHistory.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: payment.hospital.profile,
                  }}
                  name={payment.hospital.name}
                >
                  abc
                </User>
              </TableCell>
              <TableCell>{payment.disease}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={`${
                    payment.status === "Completed" ? "success" : "danger"
                  }`}
                  size="sm"
                  variant="flat"
                >
                  {payment.status}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
