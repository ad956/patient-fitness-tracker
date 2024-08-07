import { useState, useMemo, useCallback } from "react";
import { Selection, SortDescriptor } from "@nextui-org/react";

type Hospital = {
  name: string;
  profile: string;
};

type Transaction = {
  hospital: Hospital;
  disease: string;
  description: string;
  createdAt: string;
  amount: number;
  status: "Success" | "Failed";
};

export default function useFilterTransaction(
  TransactionHistory: Transaction[]
) {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>(new Set(["all"]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const filteredItems = useMemo(() => {
    let filteredTransactions = [...TransactionHistory];

    if (filterValue) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.hospital.name
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter instanceof Set &&
      !statusFilter.has("all") &&
      statusFilter.size > 0
    ) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        statusFilter.has(transaction.status)
      );
    }

    return filteredTransactions;
  }, [TransactionHistory, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Transaction, b: Transaction) => {
      const first = a[sortDescriptor.column as keyof Transaction];
      const second = b[sortDescriptor.column as keyof Transaction];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = useCallback(() => {
    if (page < pages) setPage(page + 1);
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onStatusFilterChange = useCallback((keys: Selection) => {
    setStatusFilter(keys);
    setPage(1);
  }, []);

  return {
    filterValue,
    statusFilter,
    page,
    pages,
    sortDescriptor,
    sortedItems,
    setPage,
    onNextPage,
    onPreviousPage,
    onSearchChange,
    onClear,
    onStatusFilterChange,
    setSortDescriptor,
    setRowsPerPage,
  };
}
