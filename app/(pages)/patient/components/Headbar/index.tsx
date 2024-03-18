import React from "react";
import { BrandLogo } from "../../../../components/brandlogo";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { Avatar, Button, Divider, Input, Link, User } from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import { logout } from "@/lib/authUtils";
import { redirect } from "next/navigation";
import { logoutAction } from "@/lib/actions";

export default function Headbar() {
  return (
    <div className="bg-[#f3f6fd] p-4 flex flex-row justify-between mr-5">
      <div className="flex items-center gap-5 w-3/5">
        <p className="text-lg font-semibold tracking-wider">
          Patient Fitness Tracker
        </p>
        <div className="w-2/5">
          <Input
            isClearable
            radius="lg"
            classNames={{
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "bg-white",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          size="sm"
          className="bg-black text-white font-bold h-[30px]"
          // onClick={() => console.log("")}
        >
          <GoPlus size={15} />
        </Button>

        <CiBellOn size={30} />

        <Divider orientation="vertical" className="h-8 bg-gray-500" />

        <User
          name="Anand Suthar"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026302d",
          }}
        />

        <form action={logoutAction}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  );
}
