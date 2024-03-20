"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FcCloseUpMode } from "react-icons/fc";

export default function Notifications() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      showArrow
      placement="bottom-start"
      size="lg"
      offset={10}
    >
      <PopoverTrigger>
        <Button isIconOnly size="sm" className="">
          <CiBellOn size={25} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Notifications</div>
          <div className="text-tiny">
            <Listbox aria-label="Actions">
              <ListboxItem key="" className="flex flex-row gap-5">
                <FcCloseUpMode /> This is a notification
              </ListboxItem>
              <ListboxItem key="" className="flex flex-row gap-5">
                <FcCloseUpMode /> This is a notification
              </ListboxItem>
              <ListboxItem key="" className="flex flex-row gap-5">
                <FcCloseUpMode /> This is a notification
              </ListboxItem>
              <ListboxItem key="" className="flex flex-row gap-5">
                <FcCloseUpMode /> This is a notification
              </ListboxItem>
            </Listbox>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
