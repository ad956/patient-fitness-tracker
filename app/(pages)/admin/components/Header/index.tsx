"use client";

import {
  Navbar,
  NavbarContent,
  Input,
  Avatar,
  NavbarBrand,
} from "@nextui-org/react";

const Header = ({ isMenuOpen, setIsMenuOpen }: any) => (
  <Navbar
    isBordered
    className="w-11/12 self-center rounded-lg flex justify-between items-center px-4"
  >
    <NavbarBrand className="flex-1">
      <p className="font-medium text-xl text-gray-800">Dashboard</p>
    </NavbarBrand>
    <div className="flex items-center gap-4">
      <Input
        classNames={{
          base: "max-w-[240px]",
          inputWrapper: "h-10 bg-gray-100 rounded-md",
          input: "text-small text-gray-600 placeholder:text-gray-400",
        }}
        placeholder="Search..."
        size="sm"
        startContent={<span className="text-gray-400">🔍</span>}
        type="search"
      />
      <Avatar
        isBordered
        as="button"
        className="transition-transform hover:scale-105"
        color="default"
        name="Jason Hughes"
        size="md"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
    </div>
  </Navbar>
);

export default Header;
