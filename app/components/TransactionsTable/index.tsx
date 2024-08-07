import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";
import { getFormattedDate } from "@utils/getDate";
import { SortDescriptor } from "@nextui-org/react";

interface Hospital {
  name: string;
  profile: string;
}

interface Payment {
  hospital: Hospital;
  disease: string;
  description: string;
  createdAt: string;
  amount: number;
  status: "Success" | "Failed";
}

interface TransactionsTableProps {
  items: Payment[];
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  renderCell: (payment: Payment, columnKey: React.Key) => React.ReactNode;
}

export default function TransactionsTable({
  items,
  sortDescriptor,
  onSortChange,
  renderCell,
}: TransactionsTableProps) {
  return (
    <Table
      aria-label="Payment history table"
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    >
      <TableHeader>
        <TableColumn key="hospital" allowsSorting>
          Hospital
        </TableColumn>
        <TableColumn key="disease" allowsSorting>
          Disease
        </TableColumn>
        <TableColumn key="description" allowsSorting>
          Description
        </TableColumn>
        <TableColumn key="createdAt" allowsSorting>
          Date
        </TableColumn>
        <TableColumn key="amount" allowsSorting>
          Amount
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          Status
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No payment history available yet."}>
        {items.map((payment, index) => (
          <TableRow key={index} className="hover:bg-gray-50">
            {(columnKey) => (
              <TableCell>{renderCell(payment, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
