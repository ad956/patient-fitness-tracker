"use client";

import React, { useState } from "react";
import { BrandLogo } from "../brandlogo";
import { CiMenuFries } from "react-icons/ci";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

const navLinks = [
  { title: "Home", key: "home" },
  { title: "Features", key: "features" },
  { title: "Services", key: "services" },
  { title: "About", key: "about" },
  { title: "Contact Us", key: "contact" },
];

export default function NavBar() {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLinkClick = (link: string): void => {
    setActiveLink(link === activeLink ? "" : link);
  };

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <BrandLogo />
      </NavbarBrand>
      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {navLinks.map((navLink) => (
          <NavbarItem key={navLink.key} isActive={activeLink === navLink.key}>
            <Link
              aria-current={activeLink === navLink.key ? "page" : undefined}
              data-active={activeLink === navLink.key ? "page" : undefined}
              color={activeLink === navLink.key ? "primary" : "foreground"}
              href={`/#${navLink.key}`}
              onClick={() => handleLinkClick(navLink.key)}
            >
              {navLink.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
