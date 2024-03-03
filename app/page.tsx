import Image from "next/image";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";

export default function Home() {
  return (
    <main className="">
      <div className="flex justify-between items-center p-2 border-2 border-black rounded-b-xl border-t-0">
        <div className="flex items-center gap-2">
          <Image src="patient.svg" height="40" width="40" alt="brand-logo" />
          <h2 className="text-xl font-extrabold">Patient Fitness Tracker</h2>
        </div>
        <CiMenuFries className="text-black h-6 w-6" />
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
