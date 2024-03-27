import { getPatientData } from "@/lib/getUserData";
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
    <div className="flex flex-col justify-evenly items-center h-full w-full border-2 border-purple-700">
      <div className="flex flex-row justify-center gap-5 items-center  border-2 border-orange-700">
        <Image src={patient.profile} radius="full" className="" />

        <div className="flex flex-col">
          <p className="">{patient.name}</p>
          <Link size="sm">@{patient.username}</Link>
        </div>

        <Button size="sm" className="text-xs">
          Edit
        </Button>
      </div>

      <div className="flex flex-col border-2 border-green-700">
        <p className="text-md font-bold">Personal Information</p>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p>firstname</p>
            <p>email</p>
            <p>bio</p>
          </div>
          <div className="flex flex-col">
            <p>lastname</p>
            <p>phone</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-2 border-blue-700">
        <p className="text-md font-bold">Address</p>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p>country</p>
            <p>postal</p>
          </div>
          <div className="flex flex-col">
            <p>country</p>
            <p>postal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
