import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spacer,
} from "@nextui-org/react";
import { SortDescriptor } from "@nextui-org/react";
import { MdOutlineNoAccounts } from "react-icons/md";

interface TransactionsTableProps<T> {
  items: T[];
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  renderCell: (item: T, columnKey: React.Key) => React.ReactNode;
}

export default function TransactionsTable<T>({
  items,
  sortDescriptor,
  onSortChange,
  renderCell,
}: TransactionsTableProps<T>) {
  if (items.length === 0) {
    return <NoTransactionsTable />;
  }

  const columns = Object.keys(items[0] as any);

  return (
    <Table
      aria-label="Transactions Table"
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    >
      <TableHeader>
        {columns.map((key) => (
          <TableColumn key={key} allowsSorting>
            {key.replace(/_/g, " ").charAt(0).toUpperCase() +
              key.replace(/_/g, " ").slice(1)}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index} className="hover:bg-gray-50">
            {columns.map((key) => (
              <TableCell key={key}>{renderCell(item, key)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/******************************************************
 *                                                    *
 *      ___          _____                           *
 *     /  /\        /  /::\                          *
 *    /  /::\      /  /:/\:\                         *
 *   /  /:/\:\    /  /:/  \:\                        *
 *  /  /:/~/::\  /__/:/ \__\:|                       *
 * /__/:/ /:/\:\ \  \:\ /  /:/                       *
 * \  \:\/:/__\/  \  \:\  /:/                        *
 *  \  \::/        \  \:\/:/                         *
 *   \  \:\         \  \::/                          *
 *    \  \:\         \__\/                           *
 *     \__\/                                         *
 *                                                   *
 *    What am I doing with my life?                  *
 *    While everyone else is out living it up,       *
 *    I'm here battling this table component!        *
 *    Spent 4 hours on it, but hey, it’s finally     *
 *    working! 🎉                                    *
 *                                                    *
 ******************************************************/

function NoTransactionsTable() {
  return (
    <Table
      aria-label="No Transactions Table"
      style={{ minWidth: "100%", marginTop: "1rem", textAlign: "center" }}
    >
      <TableHeader>
        <TableColumn>No Transactions</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
            }}
          >
            <MdOutlineNoAccounts size={48} color="gray" />
            <Spacer y={0.5} />
            <h4>No transactions found</h4>
            <p style={{ color: "$accents7" }}>
              It looks like there are no recent transactions. Please check back
              later.
            </p>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
