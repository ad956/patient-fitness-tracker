import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { BiFilterAlt } from "react-icons/bi";
import { Selection } from "@nextui-org/react";

interface StatusFilterProps {
  statusFilter: Selection;
  onStatusFilterChange: (keys: Selection) => void;
}

export default function StatusFilter({
  statusFilter,
  onStatusFilterChange,
}: StatusFilterProps) {
  const handleSelectionChange = (keys: Selection) => {
    if (keys instanceof Set) {
      if (keys.has("all")) {
        onStatusFilterChange(new Set(["all"]));
      } else if (keys.size === 0) {
        // nothing is selected, default to "all"
        onStatusFilterChange(new Set(["all"]));
      } else {
        onStatusFilterChange(keys);
      }
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<BiFilterAlt className="text-small" />}
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
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="all">All</DropdownItem>
        <DropdownItem key="Success">Success</DropdownItem>
        <DropdownItem key="Failed">Failed</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
