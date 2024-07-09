import { Divider } from "@nextui-org/react";
import {
  About,
  ContactUS,
  Features,
  Footer,
  Intro,
  Lifeline,
  NavBar,
  ServicesOffered,
  Testimonial,
  TrustedBy,
  WorkingProcess,
} from "./components/landing-page";

export default function LandingPage() {
  return (
    <main className="scroll-smooth h-screen">
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

      <About />
      <ContactUS />
      <Footer />
    </main>
  );
}
