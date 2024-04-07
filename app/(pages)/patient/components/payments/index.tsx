"use client";

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
import { useState, useEffect } from "react";

export default function Payments() {
  const [payments, setPayments] = useState<PaymentsHistory[]>([]);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/patient/payment"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        console.log(data);

        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    }

    fetchPayments();
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <Table aria-label="Payment history" className="h-5/6">
        <TableHeader>
          <TableColumn>Hospital</TableColumn>
          <TableColumn>Type</TableColumn>
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
