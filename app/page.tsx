import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="border-2 border-black rounded-xl">
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
