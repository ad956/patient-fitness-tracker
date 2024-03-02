import Image from "next/image";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";

export default function Home() {
  return (
    <main className="m-2">
      <div className="flex justify-between items-center p-2 border-2 border-black rounded-b-xl border-t-0">
        <div className="flex items-center gap-2">
          <Image src="patient.svg" height="30" width="30" alt="brand-logo" />
          <h2 className="font-bold">Patient Fitness Tracker</h2>
        </div>
        <CiMenuFries className="" height="50" />
      </div>
      <nav className="hidden">
        <Link href="#home">Home</Link>
        <Link href="#team">Our Team</Link>
        <Link href="#service">Services</Link>
        <Link href="#about">About Us</Link>
        <Link href="#contact">Contact Us</Link>
      </nav>
      <h2>Patient Fitness Tracker</h2>
    </main>
  );
}
