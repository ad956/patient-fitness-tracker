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

interface Payment {
  Hospital: string;
  Type: string;
  Date: string;
  Amount: number;
  Status: string;
  Image: string;
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);

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
                    src: payment.Image,
                  }}
                  name={payment.Hospital}
                >
                  abc
                </User>
              </TableCell>
              <TableCell>{payment.Type}</TableCell>
              <TableCell>{payment.Date}</TableCell>
              <TableCell>{payment.Amount}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={`${
                    payment.Status === "Completed" ? "success" : "danger"
                  }`}
                  size="sm"
                  variant="flat"
                >
                  {payment.Status}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
