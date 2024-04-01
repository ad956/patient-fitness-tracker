import { getPatientData } from "@/lib/patient/getPatientData";
import { Patient } from "@/types";
import { Link, Image, Input, Button, Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProfileSettings() {
  const { patient }: { patient: Patient } = await getPatientData();

  if (!patient) {
    return notFound();
  }

  return (
    <Card
      radius="lg"
      shadow="lg"
      className="flex flex-col justify-center gap-5 items-center h-full w-full"
    >
      <div className="flex flex-row justify-around items-center w-3/5 border2 border-rose-600">
        <div className="flex flex-row justify-center items-center gap-5">
          <Image src={patient.profile} radius="full" className="" />

          <div className="flex flex-col">
            <p className="font-bold">
              {patient.firstname + " " + patient.lastname}
            </p>
            <Link size="sm">@{patient.username}</Link>
          </div>
        </div>
        <Button size="sm" className="text-xs ml-48">
          Edit
        </Button>
      </div>

      <div className="flex flex-col justify-center gap-5 items- w-3/5 border2 border-rose-600">
        <p className="text-md font-bold self-star">Personal Information</p>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              variant="underlined"
              label="First Name"
              value={patient.firstname}
            />
            <Input
              type="email"
              variant="underlined"
              label="Email address"
              value={patient.email}
            />
          </div>
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              variant="underlined"
              label="Last Name"
              value={patient.lastname}
            />
            <Input
              type="text"
              variant="underlined"
              label="Phone"
              value={patient.contact}
            />
          </div>
          <Button size="sm" className="text-xs self-center">
            Edit
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5 items- w-3/5 border2 border-rose-600">
        <p className="text-md font-bold self-start">Address</p>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              variant="underlined"
              label="Address"
              value={"F 310 lorem ipsum lorem"}
            />
            <Input
              type="text"
              variant="underlined"
              label="State"
              value={"Gujarat"}
            />
          </div>
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              variant="underlined"
              label="City"
              value={"Vadodara"}
            />
            <Input
              type="text"
              variant="underlined"
              label="Postal Code"
              value={"390025"}
            />
          </div>
          <Button size="sm" className="text-xs self-center">
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
}
