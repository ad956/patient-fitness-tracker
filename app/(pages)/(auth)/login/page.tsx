"use client";
import { useState, useRef, ChangeEvent } from "react";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const lato = Lato({ weight: "400", style: "normal", subsets: ["latin"] });
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Data } from "@/app/constants";
import Carousel from "@/app/components/carousel";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null || String);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null || String);
  const [isVisible, setIsVisible] = useState(false);

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(e.target.value);
    setEmail(e.target.value);
    setEmailError(isValidEmail ? "" : "Please enter a valid email address");
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = passwordRegex.test(e.target.value);
    setPassword(e.target.value);
    setPasswordError(
      isValidPassword
        ? ""
        : "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &)"
    );
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
      {/* left part */}
      <div className="m-4 lg:w-1/4 flex flex-col gap-8 self-center">
        <div className="flex justify-center items-center ">
          <Image src="patient.svg" height="50" width="50" alt="brand-logo" />
          <h2 className="ml-2 font-bold text-lg">Patient Fitness Tracker</h2>
        </div>
        <div className="">
          <h3 className="text-3xl font-bold tracking-wider">Welcome Back!</h3>
          <p className="text-[13px] text-gray-500">
            Please enter log in details below
          </p>
        </div>

        <form className="flex flex-col" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            autoComplete="username"
            className={`bg-[#fcfdfe] w-full m-2 p-2 rounded-lg border-2 ${
              emailError ? "border-red-700" : "border-gray-300"
            } `}
            onChange={handleEmailChange}
          />
          {emailError && <p className="text-red-700 text-sm">{emailError}</p>}
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              ref={ref}
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              className={`bg-[#fcfdfe] border-2 m-2 p-2 w-full rounded-lg  ${
                passwordError ? "border-red-700" : "border-gray-300"
              }`}
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
          {passwordError && (
            <p className="text-red-700 text-sm">{passwordError}</p>
          )}
          <Link href="#">
            {" "}
            <p className="text-[10px] text-right m-2">Forget password?</p>
          </Link>
          <button
            type="submit"
            className="text-white text-lg rounded-lg bg-[#0d0909] h-12 ml-4 my-2"
          >
            Sign in
          </button>
        </form>

        <div className="flex justify-center gap-5 items-center">
          <div className="h-[1px] w-28 bg-gray-500"></div>
          <div className="text-sm">or continue</div>
          <div className="h-[1px] w-28 bg-gray-500"></div>
        </div>

        <button className="flex justify-center items-center gap-2 text-sm font-thin border-2 border-black rounded-lg h-12 mx-10">
          <Image src="google.svg" height="30" width="30" alt="google-sign-in" />{" "}
          Log in with Google
        </button>
        <p className="text-gray-500 text-sm text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-black">
            Sign Up
          </Link>
        </p>
      </div>
      {/* // right part only visible from lg */}
      <div className="hidden lg:w-2/5 m-2 bg-[#161313] rounded-t-2xl rounded-br-2xl  rounded-bl-[40px]  lg:flex lg:flex-col lg:justify-center lg:items-center">
        <Carousel data={Data} />
      </div>
    </div>
  );
}
