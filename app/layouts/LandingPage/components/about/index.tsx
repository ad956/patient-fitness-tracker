import { Card, Image } from "@nextui-org/react";

export default function About() {
  return (
    <section
      id="about"
      className="lg:h-full flex flex-col-reverse lg:flex-row justify-around items-center"
    >
      <Card isBlurred shadow="lg" className="lg:h-4/5 lg:w-2/5">
        <Image
          alt="about-us"
          src="images/about-us.jpg"
          height="auto"
          width="100%"
        />
      </Card>

      <div className="p-5 flex flex-col justify-center gap-5 lg:h-4/5 lg:w-2/5">
        <p className="text-[#e95b7b] tracking-wide text-2xl font-bold">
          About Us
        </p>
        <p className="text-3xl lg:text-4xl font-bold">
          Book your appointment with an ease
        </p>

        <p className="text-md">
          A cutting-edge medical appointment scheduling platform designed to
          provide patients with a seamless and efficient booking experience,
          ensuring fast and reliable access to healthcare services.
        </p>

        <div className="font-bold text-sm lg:text-xs flex flex-col lg:flex-row justify-center gap-2 lg:items-center">
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
