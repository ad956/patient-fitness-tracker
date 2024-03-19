import { Card, Image, Button, Select, SelectItem } from "@nextui-org/react";
import SelectHosiptal from "../components/SelectHospital";

export default function Appointments() {
  return (
    <section className="h-full w-full flex flex-col gap-5  p-5">
      <Card
        isBlurred
        radius="lg"
        className="border-none flex flex-row justify-around items-center mx-5 bg-[#e95b7b"
      >
        <div className="flex flex-col gap-2">
          <div className="">
            <p className="text-2xl font-bold">
              Welcome to your appointment section,
            </p>
            <p className="text-2xl font-semibold">Anand!</p>
          </div>
          <p className="text-tiny text-black/80 my-2">
            To book an appointment, first, select your city. Then, choose a
            hospital within that city. Finally, provide your details to confirm
            the appointment.
          </p>
        </div>
        <Image
          alt="Appointment Booking Instuc"
          className="object-cover"
          height={200}
          src="/images/appointment1.png"
          width={200}
        />
      </Card>

      <div className="flex flex-col justify-center gap-5 mx-5 mt-10">
        <p className="text-lg font-bold">Book an appointment</p>
        <SelectHosiptal />
      </div>
    </section>
  );
}
