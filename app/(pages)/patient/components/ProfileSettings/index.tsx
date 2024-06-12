"use client";

import { Patient } from "@/types";
import { Input, Button, Card, Avatar } from "@nextui-org/react";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ProfileSettings({ patient }: { patient: Patient }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Card
      radius="lg"
      shadow="lg"
      className="flex flex-col gap-5 items-center p-5 h-full w-full overflow-y-scroll"
    >
      <p className="self-start font-bold text-md tracking-wider">
        Profile Settings
      </p>

      <form
        className="flex flex-col justify-center md:flex-row md:justify-around gap-5 p-5 items-center md:h-full md:w-full"
        onSubmit={handleFormSubmit}
      >
        <div className="relative">
          <Avatar src={patient.profile} className="w-48 h-48 text-large" />
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
            value={patient.dob}
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
            type={isVisible ? "text" : "password"}
            variant="underlined"
            label="Password"
            value={"your_password"}
            className="max-w-xs"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <AiTwotoneEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
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
            value={patient.gender}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="Address Line 1"
            value={patient.address.address_line_1}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Address Line 2"
            value={patient.address.address_line_2}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="City"
            value={patient.address.city}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="State"
            value={patient.address.state}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="Zip Code"
            value={patient.address.zip_code}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Country"
            value={patient.address.country}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-row hfull w-full mt-10 justify-center items-center">
          <Button color="danger" variant="shadow">
            Update Profile
          </Button>
        </div>

        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/sign-image"
          onSuccess={(result) => {
            console.log("yeahh");
            // setResult(result?.info as UploadedAssetData);
          }}
        >
          {({ open }) => (
            <button
              className="bg-indigo-500 rounded py-2 px-4 mb-4 text-white"
              onClick={() => open()}
            >
              Upload an Image
            </button>
          )}
        </CldUploadWidget>
      </form>
    </Card>
  );
}
