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

      <section className="flex flex-col">
        <h1 className="">
          The <span className="text-violet-600">New Era</span> of Healthcare
          Management
        </h1>

        <p className="">
          The Patient Fitness Tracker introduces a new era of healthcare
          management, offering a comprehensive platform to streamline patient
          care, optimize operations, and enhance collaboration across medical
          facilities.
        </p>
      </section>
    </main>
  );
}
