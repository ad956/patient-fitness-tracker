"use client";

import { Patient } from "@/types";
import { Input, Button, Card, Avatar, Tooltip } from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ProfileSettings({ patient }: { patient: Patient }) {
  const [isVisible, setIsVisible] = useState(true);
  const [profilePicture, setProfilePicture] = useState(patient.profile);
  const [firstname, setFirstname] = useState(patient.firstname);
  const [username, setUsername] = useState(patient.username);
  const [email, setEmail] = useState(patient.email);
  const [dob, setDob] = useState(patient.dob);
  const [lastname, setLastname] = useState(patient.lastname);
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState(patient.contact);
  const [gender, setGender] = useState(patient.gender);
  const [address, setAddress] = useState({
    address_line_1: patient.address.address_line_1,
    address_line_2: patient.address.address_line_2,
    city: patient.address.city,
    state: patient.address.state,
    zip_code: patient.address.zip_code,
    country: patient.address.country,
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updatedFields = {
      profile: profilePicture !== patient.profile ? profilePicture : undefined,
      firstname: firstname !== patient.firstname ? firstname : undefined,
      username: username !== patient.username ? username : undefined,
      email: email !== patient.email ? email : undefined,
      dob: dob !== patient.dob ? dob : undefined,
      lastname: lastname !== patient.lastname ? lastname : undefined,
      password: password !== "" ? password : undefined,
      contact: contact !== patient.contact ? contact : undefined,
      gender: gender !== patient.gender ? gender : undefined,
      address: {
        address_line_1:
          address.address_line_1 !== patient.address.address_line_1
            ? address.address_line_1
            : undefined,
        address_line_2:
          address.address_line_2 !== patient.address.address_line_2
            ? address.address_line_2
            : undefined,
        city: address.city !== patient.address.city ? address.city : undefined,
        state:
          address.state !== patient.address.state ? address.state : undefined,
        zip_code:
          address.zip_code !== patient.address.zip_code
            ? address.zip_code
            : undefined,
        country:
          address.country !== patient.address.country
            ? address.country
            : undefined,
      },
    };

    try {
      // await axios.put(`/api/patients/${patient.id}`, updatedFields);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <Card
      radius="lg"
      shadow="lg"
      className="flex flex-col gap-5 items-center p-5 h-full w-full overflow-y-auto"
    >
      <Card
        radius="lg"
        className="border-none flex flex-col justify-center md:flex-row md:justify-around items-center py-52 px-2 md:p-5 w-full"
      >
        <div className="flex flex-col gap-2">
          <div className="">
            <p className="text-2xl font-bold">
              Welcome to your profile settings,
            </p>
            <p className="text-2xl font-semibold">{patient.firstname} !</p>
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

      <form
        className="flex flex-col justify-center md:flex-row md:justify-around gap-5 p-5 items-center md:h-full md:w-full"
        onSubmit={handleFormSubmit}
      >
        <div className="relative">
          <CldUploadWidget
            signatureEndpoint="/api/cloudinary/sign-image"
            onSuccess={(result) => {
              console.log("yeahh");
              // setResult(result?.info as UploadedAssetData);
            }}
          >
            {({ open }) => (
              <Tooltip
                color="foreground"
                showArrow={true}
                content="Click to Update Your Profile Picture"
              >
                <Avatar
                  src={patient.profile}
                  className="w-48 h-48 text-large"
                  onClick={() => open()}
                  // onDoubleClick={}
                />
              </Tooltip>
            )}
          </CldUploadWidget>
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
            value={"new password"}
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
      </form>
    </Card>
  );
}
