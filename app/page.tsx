import NavBar from "./components/navbar";
import Intro from "./components/intro";
import { Card, CardFooter, Image, Button, Divider } from "@nextui-org/react";
import Lifeline from "./components/lifeline";
import TrustedBy from "./components/trustedby";
import Features from "./components/features";
import WorkingProcess from "./components/working";
import ServicesOffered from "./components/services";
import Testimonial from "./components/testimonial";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="h-[100vh]">
      <NavBar />
      <Intro />
      <Lifeline />

      <section className="my-10 flex justify-center">
        <Divider className="w-4/5 bg-gray-400" />
      </section>

      <section className="flex justify-center items-center">
        <TrustedBy />
      </section>

      <Features />
      <WorkingProcess />

      <ServicesOffered />

      <Testimonial />

      <Footer />
    </main>
  );
}
