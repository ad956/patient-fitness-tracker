import { useState, useMemo, useCallback } from "react";
import { Selection, SortDescriptor } from "@nextui-org/react";

export default function useFilterTransaction<T>(transactionHistory: T[]) {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>(new Set(["all"]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const filteredItems = useMemo(() => {
    let filteredTransactions = [...transactionHistory];

    if (filterValue) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const hospitalName = (
          transaction as any
        )?.hospital?.name?.toLowerCase();
        return hospitalName && hospitalName.includes(filterValue.toLowerCase());
      });
    }

    if (
      statusFilter instanceof Set &&
      !statusFilter.has("all") &&
      statusFilter.size > 0
    ) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        statusFilter.has((transaction as any).status)
      );
    }

    return filteredTransactions;
  }, [transactionHistory, filterValue, statusFilter]);

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / rowsPerPage);
  }, [filteredItems, rowsPerPage]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: T, b: T) => {
      const first = (a as any)[sortDescriptor.column as keyof T];
      const second = (b as any)[sortDescriptor.column as keyof T];
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
