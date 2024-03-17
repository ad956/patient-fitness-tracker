import { Card, Image } from "@nextui-org/react";

export default function About() {
  return (
    <section id="about" className="h-full flex justify-around items-center">
      <Card isBlurred shadow="lg" className=" h-4/5 w-2/5">
        <Image src="images/about-us.jpg" height="auto" width="100%" />
      </Card>

      <div className=" p-5 flex flex-col justify-center gap-5 h-4/5 w-2/5">
        <p className="text-[#e95b7b] tracking-wide text-2xl font-bold">
          About Us
        </p>
        <p className="text-4xl font-bold">Book your appointment with an ease</p>

        <p className="text-md">
          A cutting-edge medical appointment scheduling platform designed to
          provide patients with a seamless and efficient booking experience,
          ensuring fast and reliable access to healthcare services.
        </p>

        <div className="font-bold text-xs flex justify-center gap-2 items-center">
          <p className="">Rapid Appointment Booking</p>
          <DividerDot />
          <p className="">Emergency Assistance</p>
          <DividerDot />
          <p className="">Expert Medical Professionals</p>
          <DividerDot />
          <p className="">Comprehensive Medical Treatment</p>
        </div>
      </div>
    </section>
  );
}

function DividerDot() {
  return <div className="bg-[#e95b7b] rounded-xl h-2 w-2"></div>;
}
