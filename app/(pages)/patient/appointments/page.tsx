import { Card, Image, Button, Textarea } from "@nextui-org/react";
import BookAppointment from "../components/BookAppointment";
import { Patient } from "@/types";
import { getPatientData } from "@/lib/patient/getPatientData";
import { notFound } from "next/navigation";

export default async function Appointments() {
  const { patient }: { patient: Patient } = await getPatientData();

  if (!patient) {
    return notFound();
  }

  const name = patient.name.split(" ")[0];

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
            <p className="text-2xl font-semibold">{name} !</p>
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

      <BookAppointment />
    </section>
  );
}
