import { getPatientData } from "@/lib/getUserData";
import { Patient } from "@/types";
import { Link, Image, Input } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProfileSettings() {
  const { patient }: { patient: Patient } = await getPatientData();

  if (!patient) {
    return notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-row justify-center gap-5 items-center">
        <Image src={patient.profile} radius="full" className="" />

        <div className="flex flex-col">
          <p className="">{patient.name}</p>
          <Link size="sm">@{patient.username}</Link>
        </div>
      </div>

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

      {/* <Input
        name="email"
        variant="bordered"
        size="lg"
        type="email"
        placeholder="you@example.com"
        // startContent={<MdOutlineAlternateEmail />}
        // value={email}
        className="mx-2 my-1"
        // onChange={handleEmailChange}
      />
      <Input
        name="email"
        variant="bordered"
        size="lg"
        type="email"
        placeholder="you@example.com"
        // startContent={<MdOutlineAlternateEmail />}
        // value={email}
        className="mx-2 my-1"
        // onChange={handleEmailChange}
      /> */}
    </div>
  );
}
