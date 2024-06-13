"use client";

import { Patient } from "@/types";
import { Input, Button, Card, Avatar, Tooltip } from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { type ChangeEvent, useRef, useState, useEffect } from "react";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileSettings({ patient }: { patient: Patient }) {
  const [isVisible, setIsVisible] = useState(true);

  const [firstname, setFirstName] = useState(patient.firstname);
  const [firstNameError, setFirstNameError] = useState(null || String);
  const [lastname, setLastName] = useState(patient.lastname);
  const [lastNameError, setLastNameError] = useState(null || String);
  const [username, setUsername] = useState(patient.username);
  const [usernameError, setUsernameError] = useState(null || String);
  const [email, setEmail] = useState(patient.email);
  const [emailError, setEmailError] = useState(null || String);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null || String);
  const [profilePicture, setProfilePicture] = useState(patient.profile);
  const [dob, setDob] = useState(patient.dob);
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
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
    const firstNameRegex = /^[a-zA-Z'-]+$/;
    const isValidFirstName = firstNameRegex.test(e.target.value);

    setFirstNameError(
      isValidFirstName
        ? ""
        : "First name must only contain letters, hyphens, and apostrophes"
    );
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    const lastNameRegex = /^[a-zA-Z'-]+(?: [a-zA-Z'-]+)*$/;
    const isValidLastName = lastNameRegex.test(e.target.value);

    setLastNameError(
      isValidLastName
        ? ""
        : "Last name must only contain letters, hyphens, and apostrophes, with optional spaces between parts"
    );
    setLastName(e.target.value);
  }

  function handleUserNameChange(e: ChangeEvent<HTMLInputElement>) {
    const usernameRegex = /^[a-zA-Z0-9]{5,10}$/;
    const isValidUsername = usernameRegex.test(e.target.value);

    setUsernameError(
      isValidUsername
        ? ""
        : "Username must be between 5 and 10 characters long and contain only letters and numbers"
    );
    setUsername(e.target.value);
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(e.target.value);

    setEmailError(isValidEmail ? "" : "Please enter a valid email address");
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = passwordRegex.test(e.target.value);
    const missingComponents = [];

    if (!/[a-z]/.test(e.target.value)) {
      missingComponents.push("at least one lowercase letter");
    }

    if (!/[A-Z]/.test(e.target.value)) {
      missingComponents.push("at least one uppercase letter");
    }

    if (!/[0-9]/.test(e.target.value)) {
      missingComponents.push("at least one number");
    }

    if (!/[@$!%*?&]/.test(e.target.value)) {
      missingComponents.push(
        "at least one special character (@, $, !, %, *, ?, &)"
      );
    }

    setPasswordError(
      isValidPassword
        ? ""
        : missingComponents.length > 0
        ? `Password must contain at least 8 characters, and ${missingComponents.join(
            " and "
          )}.`
        : "Password is too short. It must be at least 8 characters long."
    );
    setPassword(e.target.value);
  }

  useEffect(() => {
    setUpdateDisabled(isUpdateDisabled());
  }, [
    firstNameError,
    firstname,
    lastNameError,
    lastname,
    usernameError,
    username,
    emailError,
    email,
    passwordError,
    password,
  ]);

  function isUpdateDisabled(): boolean {
    return (
      !!firstNameError ||
      !firstname ||
      !!lastNameError ||
      !lastname ||
      !!usernameError ||
      !username ||
      !!emailError ||
      !email ||
      !!passwordError ||
      !password
    );
  }

  const showToast = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current?.name === "firstname") {
      if (firstNameError) {
        toast.error(firstNameError, {
          position: "bottom-center",
        });
      }
    }
    if (inputRef.current?.name === "lastname") {
      if (lastNameError) {
        toast.error(lastNameError, {
          position: "bottom-center",
        });
      }
    }
    if (inputRef.current?.name === "username") {
      if (usernameError) {
        toast.error(usernameError, {
          position: "bottom-center",
        });
      }
    }
    if (inputRef.current?.name === "email") {
      if (emailError) {
        toast.error(emailError, {
          position: "bottom-center",
        });
      }
    }
    if (
      inputRef.current?.name === "password" ||
      inputRef.current?.name === "confirmpassword"
    ) {
      if (passwordError) {
        toast.error(passwordError, {
          position: "bottom-center",
        });
      }
    }
  };

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
      {/* <Card
        radius="lg"
        className="border-none flex flex-col justify-center md:flex-row md:justify-around items-center py-52 px-2 md:p-10 w-5/6"
      >
        <div className="flex flex-col gap-2">
          <div className="">
            <p className="text-2xl font-bold">
              Welcome to your profile settings,
            </p>
            <p className="text-2xl font-semibold">{patient.firstname} !</p>
          </div>
          <p className="text-tiny text-black/80 my-2">
            Here, you can manage your profile information and settings. Update
            your details, change your password, and customize your account
            preferences.
          </p>
        </div>
        <Image
          alt="Appointment Booking Instuc"
          className="object-cover"
          height={200}
          src="/images/appointment1.png"
          width={200}
        />
      </Card> */}

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
                  src={profilePicture}
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
            name="firstname"
            type="text"
            variant="underlined"
            label="First Name"
            value={firstname}
            className="max-w-xs"
            onChange={handleFirstNameChange}
            ref={firstNameRef}
            onBlur={() => showToast(firstNameRef)}
          />
          <Input
            name="username"
            type="text"
            variant="underlined"
            label="Username"
            autoComplete="username"
            value={username}
            className="max-w-xs"
            onChange={handleUserNameChange}
            ref={usernameRef}
            onBlur={() => showToast(usernameRef)}
          />
          <Input
            name="email"
            type="email"
            variant="underlined"
            label="Email address"
            value={email}
            className="max-w-xs"
            autoComplete="email"
            onChange={handleEmailChange}
            ref={emailRef}
            onBlur={() => showToast(emailRef)}
          />
          <Input
            name="dob"
            type="text"
            variant="underlined"
            label="DOB"
            value={dob}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            name="lastname"
            type="text"
            variant="underlined"
            label="Last Name"
            value={lastname}
            className="max-w-xs"
            onChange={handleLastNameChange}
            ref={lastNameRef}
            onBlur={() => showToast(lastNameRef)}
          />
          <Input
            name="password"
            type={isVisible ? "text" : "password"}
            variant="underlined"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
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
            ref={passwordRef}
            onBlur={() => showToast(passwordRef)}
          />
          <Input
            name="phone"
            type="text"
            variant="underlined"
            label="Phone"
            value={contact}
            className="max-w-xs"
          />
          <Input
            name="gender"
            type="text"
            variant="underlined"
            label="Gender"
            value={gender}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            name="address_line1"
            type="text"
            variant="underlined"
            label="Address Line 1"
            value={address.address_line_1}
            className="max-w-xs"
          />
          <Input
            name="address_line2"
            type="text"
            variant="underlined"
            label="Address Line 2"
            value={address.address_line_2}
            className="max-w-xs"
          />
          <Input
            name="city"
            type="text"
            variant="underlined"
            label="City"
            value={address.city}
            className="max-w-xs"
          />
          <Input
            name="state"
            type="text"
            variant="underlined"
            label="State"
            value={address.state}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            name="zipcode"
            type="text"
            variant="underlined"
            label="Zip Code"
            value={address.zip_code}
            className="max-w-xs"
          />
          <Input
            name="country"
            type="text"
            variant="underlined"
            label="Country"
            value={address.country}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-row hfull w-full mt-10 justify-center items-center">
          <Button color="danger" variant="shadow" isDisabled={updateDisabled}>
            Update Profile
          </Button>
        </div>
      </form>
      <Toaster />
    </Card>
  );
}
