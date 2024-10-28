"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from "@nextui-org/react";
import { LabResult } from "@pft-types/patient";

const labResults: LabResult[] = [
  {
    id: "LR-001",
    test: "Complete Blood Count",
    date: "2024-10-14",
    status: "Completed",
    result: "Normal",
  },
  {
    id: "LR-002",
    test: "Lipid Profile",
    date: "2024-10-15",
    status: "Pending",
    result: "Awaiting",
  },
  {
    id: "LR-003",
    test: "Thyroid Function",
    date: "2024-10-16",
    status: "Processing",
    result: "In Progress",
  },
];

const LabResults: React.FC = () => (
  <div className="h-[178px] border-2 rounded-xl p-2 overflow-y-auto scrollbar">
    <Table
      aria-label="Lab Results"
      classNames={{
        wrapper: "shadow-none",
        th: "bg-default-100/50 text-default-600 font-medium",
        td: "py-4",
      }}
    >
      <TableHeader>
        <TableColumn>TEST ID</TableColumn>
        <TableColumn>TEST NAME</TableColumn>
        <TableColumn className="hidden sm:table-cell">DATE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn className="hidden sm:table-cell">RESULT</TableColumn>
      </TableHeader>
      <TableBody>
        {labResults.map((result) => (
          <TableRow key={result.id} className="hover:bg-default-100/50">
            <TableCell className="font-medium">{result.id}</TableCell>
            <TableCell>{result.test}</TableCell>
            <TableCell className="hidden sm:table-cell">
              {result.date}
            </TableCell>
            <TableCell>
              <Badge color={getStatusColor(result.status)} variant="flat">
                {result.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {result.result}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

type StatusColor = "success" | "warning" | "primary" | "default";

const getStatusColor = (status: string): StatusColor => {
  const statusColors: Record<string, StatusColor> = {
    completed: "success",
    pending: "warning",
    processing: "primary",
    online: "success",
    offline: "default",
  };
  return statusColors[status.toLowerCase()] || "default";
};

export default LabResults;
