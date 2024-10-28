import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Button,
} from "@nextui-org/react";
import useQuery from "@/hooks/useQuery";
import getLabResults from "@/lib/patient/getLabResults";
import SpinnerLoader from "@components/SpinnerLoader";

interface LabResult {
  id: string;
  test: string;
  date: string;
  status: string;
  result: string;
}

const LabResults: React.FC = () => {
  const {
    data: labResults,
    isLoading,
    error,
    refetch,
  } = useQuery<LabResult[]>(getLabResults, []);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return (
      <div className="h-[178px] border-2 rounded-xl p-2 flex flex-col items-center justify-center gap-2">
        <p className="text-danger">Error: {error}</p>
        <Button size="sm" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  if (!labResults || labResults.length === 0) {
    return (
      <div className="h-[178px] border-2 rounded-xl p-2 flex items-center justify-center">
        <p>No lab results available</p>
      </div>
    );
  }

  return (
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
};

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
