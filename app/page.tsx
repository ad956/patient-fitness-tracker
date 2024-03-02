import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="border-2 border-black rounded-xl">
        <Link href="">Home</Link>
        <Link href="">Our Team</Link>
        <Link href="">Services</Link>
        <Link href="">About Us</Link>
        <Link href="">Contact Us</Link>
      </nav>
      <h2>Patient Fitness Tracker</h2>
    </main>
  );
}
