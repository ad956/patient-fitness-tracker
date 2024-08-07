import React from "react";
import { Pagination, Button } from "@nextui-org/react";

interface PaginationControlsProps {
  page: number;
  pages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  setPage: (page: number) => void;
}

export default function PaginationControls({
  page,
  pages,
  onPreviousPage,
  onNextPage,
  setPage,
}: PaginationControlsProps) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        isCompact
        showControls
        showShadow={false}
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
        classNames={{
          cursor: "bg-foreground text-background",
        }}
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
}
