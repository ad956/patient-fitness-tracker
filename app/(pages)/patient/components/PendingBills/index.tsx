"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { PendingBill } from "@pft-types/patient";

interface PendingBillsProps {
  bills: PendingBill[];
}

const PendingBills: React.FC<PendingBillsProps> = ({ bills }) => (
  <div className="h-full overflow-y-auto">
    <Table
      aria-label="Recent Bills"
      classNames={{
        wrapper: "shadow-none",
        th: "bg-default-100/50 text-default-600 font-medium",
        td: "py-4",
      }}
    >
      <TableHeader>
        <TableColumn>BILL ID</TableColumn>
        <TableColumn className="hidden sm:table-cell">DATE</TableColumn>
        <TableColumn>SERVICE</TableColumn>
        <TableColumn align="end">AMOUNT</TableColumn>
      </TableHeader>
      <TableBody>
        {bills.map((bill) => (
          <TableRow key={bill.id} className="hover:bg-default-100/50">
            <TableCell className="font-medium">{bill.id}</TableCell>
            <TableCell className="hidden sm:table-cell">{bill.date}</TableCell>
            <TableCell>{bill.service}</TableCell>
            <TableCell className="text-primary font-medium text-right">
              ${bill.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default PendingBills;
