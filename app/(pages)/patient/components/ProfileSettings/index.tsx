import { getPatientData } from "@/lib/patient/getPatientData";
import { Patient } from "@/types";
import { Link, Image, Input, Button } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProfileSettings() {
  const { patient }: { patient: Patient } = await getPatientData();

  if (!patient) {
    return notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-row justify-around items-center w-3/5 border-2 border-rose-600">
        <div className="flex flex-row justify-center items-center gap-5">
          <Image src={patient.profile} radius="full" className="" />

          <div className="flex flex-col">
            <p className="">{patient.firstname + " " + patient.lastname}</p>
            <Link size="sm">@{patient.username}</Link>
          </div>
        </div>
        <Button size="sm" className="text-xs">
          Edit
        </Button>
      </div>

      <div className="flex flex-col justify-center gap-5 items-cente w-3/5 border-2 border-rose-600">
        <p className="text-md font-bold self-star">Personal Information</p>
        <div className="flex flex-row justify-center gap-10">
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              variant="underlined"
              label="First Name"
              value={patient.firstname}
              disabled
            />
            <Input
              type="email"
              variant="underlined"
              label="Email address"
              value={patient.lastname}
              disabled
            />
          </div>
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              variant="underlined"
              label="Last Name"
              placeholder="Enter your Lastname"
            />
            <Input
              type="text"
              variant="underlined"
              label="Phone"
              placeholder="Phone"
            />
          </div>
          <Button size="sm" className="text-xs self-center">
            Edit
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5 items-center w-3/5 border-2 border-rose-600">
        <p className="text-md font-bold self-start">Address</p>
        <div className="flex flex-row justify-center gap-10">
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              variant="underlined"
              label="Counrty"
              placeholder="Enter your Country"
            />
            <Input
              type="text"
              variant="underlined"
              label="Postal Code"
              placeholder="Enter your Postal"
            />
          </div>
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              variant="underlined"
              label="Counrty"
              placeholder="Enter your Country"
            />
            <Input
              type="text"
              variant="underlined"
              label="Postal Code"
              placeholder="Enter your Postal"
            />
          </div>
          <Button size="sm" className="text-xs self-center">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
