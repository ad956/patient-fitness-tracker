import ErrorPage from "@components/errorpage";
import { getPatientData } from "@/lib/patient/getPatientData";
import { Patient } from "@/types";
import { Link, Image, Input, Button, Card } from "@nextui-org/react";
import React from "react";

export default async function ProfileSettings() {
  const { patient }: { patient: Patient } = await getPatientData();

  if (!patient) {
    return ErrorPage("fetching patient data");
  }

  return (
    <Card
      radius="lg"
      shadow="lg"
      className="flex flex-col gap-5 items-center p-5 h-full w-full"
    >
      <p className="self-start font-bold text-md tracking-wider">
        Profile Settings
      </p>

      <div className="flex flex-row justify-around gap-5 p-5 items-center h-full w-full ">
        <div className="relative">
          <Image src={patient.profile} radius="full" className="max-w-md" />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="First Name"
            value={patient.firstname}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Username"
            value={patient.username}
            className="max-w-xs"
          />
          <Input
            type="email"
            variant="underlined"
            label="Email address"
            value={patient.email}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="DOB"
            value={"patient."}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="Last Name"
            value={patient.lastname}
            className="max-w-xs"
          />
          <Input
            type="password"
            variant="underlined"
            label="Password"
            value={"your_password"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Phone"
            value={patient.contact}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Gender"
            value={"Male"}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="Address Line 1"
            value={"A 106 Phoenix Heights"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Address Line 2"
            value={"Waghodia Daboi Ring Road"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="City"
            value={"Vadodara"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="State"
            value={"Gujarat"}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="Zip Code"
            value={"390025"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Country"
            value={"390025"}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-row hfull w-full mt-10 justify-center items-center">
          <Button color="danger" variant="shadow">
            Update Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}
