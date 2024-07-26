"use client";

import { logoutAction } from "@lib/actions";
import { Navbar, NavbarBrand, Divider, User, Button } from "@nextui-org/react";
import Notifications from "@components/Notifications";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

const Header = ({ isMenuOpen, setIsMenuOpen }: any) => (
  <div className="bg-[#f3f6fd] p-4 flex flex-row justify-between">
    <div className="flex items-center w-3/5">
      <p className="hidden ml-2 md:-ml-2 text-sm md:flex md:text-lg font-semibold tracking-wider">
        Patient Fitness Tracker
      </p>
    </div>

    <div className="flex justify-center items-center gap-2">
      <Button
        as={Link}
        isIconOnly
        radius="full"
        variant="shadow"
        size="sm"
        className=""
        href={`/appointments`}
      >
        <GoPlus size={20} />
      </Button>
      <Notifications userId={"user._id"} />
      <Divider orientation="vertical" className="h-8" />

      <User
        name={"Admin Kumar"}
        avatarProps={{
          src: "https://avatarfiles.alphacoders.com/375/375112.png",
        }}
        className=""
        description={
          <Link
            href={`/admin/settings`}
            className="text-xs text-danger"
          >{`@ad956`}</Link>
        }
      />
      <Divider orientation="vertical" className="h-8" />

      <form action={logoutAction} className="">
        <Button size="sm" type="submit" isIconOnly className="bg-transparent">
          <CiLogin size={25} />
        </Button>
      </form>
    </div>
  </div>
);

export default Header;
