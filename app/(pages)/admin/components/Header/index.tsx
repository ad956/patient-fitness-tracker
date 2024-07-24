"use client";

import Notifications from "@components/notifications";
import { logoutAction } from "@lib/actions";
import {
  Navbar,
  Avatar,
  NavbarBrand,
  Divider,
  User,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

const Header = ({ isMenuOpen, setIsMenuOpen }: any) => (
  <Navbar
    isBordered
    className="w-[90%] self-center flex flex-row justify-around rounded-lg"
  >
    <NavbarBrand className="flex-grow-0 border- border-purple-400">
      <p className="font-medium text-xl text-gray-800">Dashboard</p>
    </NavbarBrand>

    <div className="flex justify-end items-center gap-2 ml-auto border- border-purple-400">
      <Button
        as={Link}
        isIconOnly
        radius="full"
        variant="shadow"
        size="sm"
        href={`/admin/appointments`}
      >
        <GoPlus size={20} />
      </Button>
      <Notifications userId={"admin._id"} />
      <Divider orientation="vertical" className="h-8" />

      <User
        as="button"
        name={"Anand"}
        avatarProps={{
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzJjPa-3jdL6XAI0yqXBY8VzK_p5h0yQIkQ&s",
          isBordered: true,
          color: "default",
          // className: "transition-transform hover:scale-105",
          size: "md",
        }}
        className="transition-transform hover:scale-105"
        description={
          <Link
            href={`/admin/settings`}
            className="text-xs text-danger"
          >{`@ad956`}</Link>
        }
      />
      <Divider orientation="vertical" className="h-8" />

      <form action={logoutAction}>
        <Button size="sm" type="submit" isIconOnly className="bg-transparent">
          <CiLogin size={25} />
        </Button>
      </form>
    </div>
  </Navbar>
);

export default Header;
