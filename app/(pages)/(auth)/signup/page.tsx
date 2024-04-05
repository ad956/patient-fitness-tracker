"use client";
import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { carouselData } from "@/app/utils/constants";
import Carousel from "@/app/components/carousel";
import Link from "next/link";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { MdAlternateEmail, MdOutlineKey } from "react-icons/md";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BsCalendar2Date } from "react-icons/bs";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null || String);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null || String);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    name;
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

  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
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

    setConfirmPasswordError(
      isValidPassword
        ? ""
        : missingComponents.length > 0
        ? `Password must contain at least 8 characters, and ${missingComponents.join(
            " and "
          )}.`
        : "Password is too short. It must be at least 8 characters long."
    );
    setconfirmPassword(e.target.value);
  }

  function handleDobChange(e: ChangeEvent<HTMLInputElement>) {
    console.log("=> " + e.target.value);
  }
  function handleFormSubmit() {}

  const roles = [
    { label: "Patient", value: "patient" },
    { label: "Hospital", value: "hospital" },
    { label: "Receptionist", value: "receptionist" },
    { label: "Doctor", value: "doctor" },
  ];
  const showToast = (inputRef: React.RefObject<HTMLInputElement>) => {
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
      if (confirmPasswordError) {
        toast.error(confirmPasswordError, {
          position: "bottom-center",
        });
      }
    }
  };
  return (
    <div
      className={
        "bg-[#eef1f8]/20 h-screen flex flex-col justify-center lg:flex-row  lg:justify-around"
      }
    >
      {/* // right part only visible from lg */}
      <div className="hidden lg:w-2/5 m-2 bg-[#161313] rounded-t-2xl rounded-br-2xl  rounded-bl-[40px]  lg:flex lg:flex-col lg:justify-center lg:items-center">
        <Carousel data={carouselData} />
      </div>

      {/* left part */}
      <div className="m-4 lg:w-2/6 flex flex-col gap-8 self-center">
        <div className="flex justify-center items-center ">
          <Image src="patient.svg" height="50" width="50" alt="brand-logo" />
          <h2 className="ml-2 font-bold text-lg">Patient Fitness Tracker</h2>
        </div>
        <div className="">
          <h3 className="text-3xl font-bold tracking-wider">Welcome</h3>
          <p className="text-[13px] text-gray-500">
            Please enter your details below
          </p>
        </div>

        <form
          className="flex flex-col justify-center tems-center"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-row">
            <Input
              type="text"
              variant="bordered"
              placeholder="Name"
              startContent={<FaRegUserCircle size={20} />}
              size="lg"
              value={name}
              autoComplete="username"
              className="mx-2 my-1"
              onChange={handleNameChange}
              ref={emailRef}
              onBlur={() => showToast(emailRef)}
            />
            <Input
              type="text"
              variant="bordered"
              placeholder="Username"
              startContent={<PiUserCircleDuotone size={25} />}
              size="lg"
              value={name}
              autoComplete="username"
              className="mx-2 my-1"
              onChange={handleNameChange}
              ref={emailRef}
              onBlur={() => showToast(emailRef)}
            />
          </div>
          <Input
            type="email"
            variant="bordered"
            placeholder="you@example.com"
            startContent={<MdAlternateEmail size={20} />}
            size="lg"
            value={email}
            autoComplete="username"
            className="mx-2 my-1"
            onChange={handleEmailChange}
            ref={emailRef}
            onBlur={() => showToast(emailRef)}
          />
          <Input
            name="password"
            variant="bordered"
            size="lg"
            placeholder="Password"
            startContent={<MdOutlineKey />}
            value={password}
            onChange={handlePasswordChange}
            className="mx-2 my-1"
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
            type={isVisible ? "text" : "password"}
            ref={passwordRef}
            onBlur={() => showToast(passwordRef)}
          />
          <Input
            name="confirmpassword"
            variant="bordered"
            size="lg"
            placeholder="Confirm Password"
            startContent={<MdOutlineKey />}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mx-2 my-1"
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
            type={isVisible ? "text" : "password"}
            ref={confirmPasswordRef}
            onBlur={() => showToast(confirmPasswordRef)}
          />

          <Select
            name="role"
            items={roles}
            variant="bordered"
            size="md"
            label="Role"
            placeholder="Select who you are"
            className="mx-2 my-2"
          >
            {(roles) => (
              <SelectItem key={roles.value}>{roles.label}</SelectItem>
            )}
          </Select>
          <button
            type="submit"
            className="text-white text-lg rounded-lg bg-[#0d0909] h-12 ml-4 my-2"
          >
            Sign up
          </button>
        </form>

        {/* <div className="flex justify-center gap-5 items-center">
          <div className="h-[1px] w-28 bg-gray-500" />
          <div className="text-sm">or continue</div>
          <div className="h-[1px] w-28 bg-gray-500" />
        </div>

        <Button className="flex justify-center items-center gap-2 text-sm font-thin border-2 border-black rounded-lg h-12 mx-10">
          <Image src="google.svg" height="30" width="30" alt="google-sign-in" />{" "}
          Sign up with Google
        </Button> */}
        <p className="text-gray-500 text-sm text-center">
          Have an account?{" "}
          <Link href="/login" className="text-black">
            Sign In
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}
