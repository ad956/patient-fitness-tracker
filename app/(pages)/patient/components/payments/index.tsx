"use client";

import getPayments from "@/lib/patient/getPayments";
import { PaymentsHistory } from "@/types";
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

export default function Payments() {
  const [payments, setPayments] = React.useState<PaymentsHistory[]>([]);

  React.useEffect(() => {
    async function fetchPayments() {
      try {
        // calling helper method to get payments data
        const response = await getPayments();
        if (response.error) {
          throw new Error("Failed to fetch payments");
        }
        setPayments(response);
      } catch (error) {
        console.error("Error fetching payments : ", error);
      }
    }

    fetchPayments();
  }, []);

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
            <Spinner className="" label="Loading..." color="danger" />
          }
        >
          {payments.map((payment, index) => (
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
