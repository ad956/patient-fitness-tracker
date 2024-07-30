"use client";

import { getFormattedDate } from "@utils/getDate";
import { PaymentHistory } from "@types";
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
  Card,
} from "@nextui-org/react";
import React from "react";

type paymentsPropType = {
  paymentHistory: PaymentHistory[];
};

export default function PaymentDetails({ paymentHistory }: paymentsPropType) {
  return (
    <Card className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <div className="overflow-x-auto scrollbar">
        <Table
          aria-label="Payment history"
          className="min-w-full"
          isHeaderSticky={true}
        >
          <TableHeader>
            <TableColumn className="text-sm md:text-base">Hospital</TableColumn>
            <TableColumn className="text-sm md:text-base">Disease</TableColumn>
            <TableColumn className="text-sm md:text-base hidden md:table-cell">
              Description
            </TableColumn>
            <TableColumn className="text-sm md:text-base">Date</TableColumn>
            <TableColumn className="text-sm md:text-base">Amount</TableColumn>
            <TableColumn className="text-sm md:text-base">Status</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              paymentHistory.length === 0 ? (
                <div className="h-64 w-full font-bold text-black/70 grid place-items-center">
                  No payment history available yet.
                </div>
              ) : (
                <Spinner className="h-64" label="Loading..." color="warning" />
              )
            }
          >
            {paymentHistory.map((payment, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: payment.hospital.profile,
                      size: "sm",
                    }}
                    name={payment.hospital.name}
                    description={payment.hospital.name}
                    className="text-xs md:text-sm"
                  />
                </TableCell>
                <TableCell className="text-xs md:text-sm">
                  {payment.disease}
                </TableCell>
                <TableCell className="text-xs md:text-sm hidden md:table-cell">
                  {payment.description}
                </TableCell>
                <TableCell className="text-xs md:text-sm">
                  {getFormattedDate(new Date(payment.createdAt))}
                </TableCell>
                <TableCell className="text-xs md:text-sm">
                  {payment.amount}
                </TableCell>
                <TableCell>
                  <Chip
                    className="capitalize text-xs md:text-sm"
                    color={payment.status === "Success" ? "success" : "danger"}
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
    </Card>
  );
}
