import React from "react";
import { BrandLogo } from "../brandlogo";
import { CiMenuFries } from "react-icons/ci";
// import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function NavBar() {
  return (
    // <div className="flex justify-between items-center p-2 border-2 border-black rounded-b-xl border-t-0">
    //   <nav className="hidden">
    //     <Link href="#home">Home</Link>
    //     <Link href="#team">Our Team</Link>
    //     <Link href="#service">Services</Link>
    //     <Link href="#about">About Us</Link>
    //     <Link href="#contact">Contact Us</Link>
    //   </nav>
    // </div>

    <Navbar isBordered>
      <NavbarBrand>
        <BrandLogo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Our Team
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
