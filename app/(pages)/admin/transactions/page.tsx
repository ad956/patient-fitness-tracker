"use client";

import React from "react";
import { getFormattedDate } from "@utils/getDate";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Spacer,
  ScrollShadow,
  Card,
  Image,
} from "@nextui-org/react";
import { BiDownArrow, BiPlus, BiSearch } from "react-icons/bi";

const transactions = [
  {
    transaction_id: "6ce5a08c17660df643efbf56",
    patient_name: "John Doe",
    hospital_name: "City Hospital",
    hospital_profile:
      "https://marketplace.canva.com/EAE8eSD-Zyo/1/0/1600w/canva-blue%2C-white-and-green-medical-care-logo-oz1ox2GedbU.jpg",
    disease: "Common Cold",
    description: "Prescription Medication",
    amount: 300,
    status: "Success",
    date: "2024-04-05T14:23:12.456Z",
  },
  {
    transaction_id: "6ce5a08c17660df643efbf56",
    patient_name: "John Doe",
    hospital_name: "City Hospital",
    hospital_profile:
      "https://thumbs.dreamstime.com/b/red-cross-vector-icon-hospital-sign-medical-health-first-aid-symbol-isolated-vhite-modern-gradient-design-141217893.jpg",
    disease: "Common Cold",
    description: "Prescription Medication",
    amount: 500,
    status: "Failed",
    date: "2024-04-05T14:23:12.456Z",
  },
  {
    transaction_id: "6ce5a08c17660df643efbf56",
    patient_name: "John Doe",
    hospital_name: "City Hospital",
    hospital_profile:
      "https://marketplace.canva.com/EAE8eSD-Zyo/1/0/1600w/canva-blue%2C-white-and-green-medical-care-logo-oz1ox2GedbU.jpg",
    disease: "Common Cold",
    description: "Prescription Medication",
    amount: 300,
    status: "Success",
    date: "2024-04-05T14:23:12.456Z",
  },
  {
    transaction_id: "6ce5a08c17660df643efbf56",
    patient_name: "John Doe",
    hospital_name: "City Hospital",
    hospital_profile:
      "https://thumbs.dreamstime.com/b/red-cross-vector-icon-hospital-sign-medical-health-first-aid-symbol-isolated-vhite-modern-gradient-design-141217893.jpg",
    disease: "Common Cold",
    description: "Prescription Medication",
    amount: 500,
    status: "Failed",
    date: "2024-04-05T14:23:12.456Z",
  },
  {
    transaction_id: "6ce5a08c17660df643efbf56",
    patient_name: "John Doe",
    hospital_name: "City Hospital",
    hospital_profile:
      "https://marketplace.canva.com/EAE8eSD-Zyo/1/0/1600w/canva-blue%2C-white-and-green-medical-care-logo-oz1ox2GedbU.jpg",
    disease: "Common Cold",
    description: "Prescription Medication",
    amount: 300,
    status: "Success",
    date: "2024-04-05T14:23:12.456Z",
  },
  {
    transaction_id: "6ce5a08c17660df643efbf56",
    patient_name: "John Doe",
    hospital_name: "City Hospital",
    hospital_profile:
      "https://thumbs.dreamstime.com/b/red-cross-vector-icon-hospital-sign-medical-health-first-aid-symbol-isolated-vhite-modern-gradient-design-141217893.jpg",
    disease: "Common Cold",
    description: "Prescription Medication",
    amount: 500,
    status: "Failed",
    date: "2024-04-05T14:23:12.456Z",
  },
];

const statusColorMap: any = {
  Failed: "error",
  Success: "success",
};

export default function Transactions() {
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "date",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredTransactions = [...transactions];

    if (hasSearchFilter) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.patient_name
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    return filteredTransactions;
  }, [transactions, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = new Date(a[sortDescriptor.column]);
      const second = new Date(b[sortDescriptor.column]);
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((transaction: any, columnKey: any) => {
    switch (columnKey) {
      case "hospital_name":
        return (
          <Image
            src={`${transaction.hospital_profile}`}
            alt={transaction.hospital_name}
            className="w-12 h-12 rounded-full"
          />
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[transaction.status]}
            size="sm"
            variant="flat"
          >
            {transaction.status}
          </Chip>
        );
      default:
        return transaction[columnKey];
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by patient name..."
            startContent={<BiSearch />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<BiDownArrow className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status Filter"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                // onSelectionChange={setStatusFilter}
              >
                <DropdownItem key="all">All</DropdownItem>
                <DropdownItem key="Success">Success</DropdownItem>
                <DropdownItem key="Failed">Failed</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<BiPlus />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {transactions.length} transactions
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onRowsPerPageChange,
    transactions.length,
    onSearchChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages]);

  return (
    <div className="container mx-auto p-4 h-screen">
      <Card className="w-full h-full p-6 shadow-lg border border-gray-200">
        <h3 className="mb-4 text-xl font-bold text-gray-700">
          Transaction Details
        </h3>
        <div className="overflow-overflow max-h-[60vh]">
          <Table
            aria-label="Transaction Table"
            className="w-full"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
          >
            <TableHeader>
              <TableColumn>Sr. No.</TableColumn>
              <TableColumn>Transaction ID</TableColumn>
              <TableColumn>Hospital</TableColumn>
              <TableColumn>Disease</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Date</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No transactions found"}>
              {sortedItems.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{transaction.transaction_id}</TableCell>
                  <TableCell>
                    {renderCell(transaction, "hospital_name")}
                  </TableCell>
                  <TableCell>{transaction.disease}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>₹{transaction.amount}</TableCell>
                  <TableCell>{renderCell(transaction, "status")}</TableCell>
                  <TableCell>
                    {getFormattedDate(new Date(transaction.date))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
