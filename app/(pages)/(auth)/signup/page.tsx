"use client";
import { useState, useRef, ChangeEvent } from "react";
import { Lato } from "next/font/google";
import Image from "next/image";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Data } from "@/app/constants";
import Carousel from "@/app/components/carousel";
import Link from "next/link";

const lato = Lato({ weight: "400", style: "normal", subsets: ["latin"] });

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    name;
  }
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    email;
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    password;
  }
  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setconfirmPassword(e.target.value);
    confirmPassword;
  }

  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsVisible(!isVisible);
    if (ref.current) {
      ref.current.type = isVisible ? "password" : "text";
    }
  };

  function handleFormSubmit() {}

  return (
    <div
      className={`bg-[#eef1f8] h-screen flex flex-col justify-center lg:flex-row  lg:justify-around ${lato.className}`}
    >
      {/* // right part only visible from lg */}
      <div className="hidden lg:w-2/5 m-2 bg-[#161313] rounded-t-2xl rounded-br-2xl  rounded-bl-[40px]  lg:flex lg:flex-col lg:justify-center lg:items-center">
        <Carousel data={Data} />
      </div>

      {/* left part */}
      <div className="m-4 lg:w-1/4 flex flex-col gap-8 self-center">
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

        <form className="flex flex-col" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            autoComplete="username"
            className="bg-[#fcfdfe] w-full m-2 p-2 rounded-lg border-2 border-gray-300"
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            autoComplete="username"
            className="bg-[#fcfdfe] w-full m-2 p-2 rounded-lg border-2 border-gray-300"
            onChange={handleEmailChange}
          />
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              ref={ref}
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              className="bg-[#fcfdfe] border-2 border-gray-300  m-2 p-2 w-full rounded-lg"
              onChange={handlePasswordChange}
            />
            <Link href="#">
              <button
                onClick={handleClick}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {isVisible ? (
                  <AiOutlineEyeInvisible style={{ fontSize: "20px" }} />
                ) : (
                  <AiTwotoneEye style={{ fontSize: "20px" }} />
                )}
              </button>
            </Link>
          </div>
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              ref={ref}
              placeholder="Confirm password"
              value={confirmPassword}
              autoComplete="current-password"
              className="bg-[#fcfdfe] border-2 border-gray-300  m-2 p-2 w-full rounded-lg"
              onChange={handleConfirmPasswordChange}
            />
            <Link href="#">
              <button
                onClick={handleClick}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {isVisible ? (
                  <AiOutlineEyeInvisible style={{ fontSize: "20px" }} />
                ) : (
                  <AiTwotoneEye style={{ fontSize: "20px" }} />
                )}
              </button>
            </Link>
          </div>

          <button
            type="submit"
            className="text-white text-lg rounded-lg bg-[#0d0909] h-12 ml-4 my-2"
          >
            Sign up
          </button>
        </form>

        <div className="flex justify-center gap-5 items-center">
          <div className="h-[1px] w-28 bg-gray-500"></div>
          <div className="text-sm">or continue</div>
          <div className="h-[1px] w-28 bg-gray-500"></div>
        </div>

        <button className="flex justify-center items-center gap-2 text-sm font-thin border-2 border-black rounded-lg h-12 mx-10">
          <Image src="google.svg" height="30" width="30" alt="google-sign-in" />{" "}
          Sign up with Google
        </button>
        <p className="text-gray-500 text-sm text-center">
          Have an account?{" "}
          <Link href="/login" className="text-black">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
