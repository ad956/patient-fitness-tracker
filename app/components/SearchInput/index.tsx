import React from "react";
import { Input } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

interface SearchInputProps {
  value: string;
  onClear: () => void;
  onValueChange: (value: string) => void;
}

// usecase : transactions table
export default function SearchInput({
  value,
  onClear,
  onValueChange,
}: SearchInputProps) {
  return (
    <Input
      isClearable
      className="w-full sm:max-w-[44%]"
      placeholder="Search by hospital name"
      startContent={<BiSearch />}
      value={value}
      onClear={onClear}
      onValueChange={onValueChange}
    />
  );
}
