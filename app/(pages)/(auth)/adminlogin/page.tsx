"use client";

import { OtpSection } from "@components/index";
import { roles } from "@utils/constants";
import { Input, Button, Link, Card, Image } from "@nextui-org/react";
import { AiOutlineEyeInvisible, AiTwotoneEye } from "react-icons/ai";
import { MdOutlineAlternateEmail, MdOutlineKey } from "react-icons/md";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { loginAction } from "@lib/actions";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null || String);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null || String);
  const [isVisible, setIsVisible] = useState(false);
  const [Error, setError] = useState(null || String);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState({ email: "", role: "", action: "" });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loginDisabled, setLoginDisabled] = useState(true);

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

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setLoginDisabled(isLoginDisabled());
  }, [emailError, email, passwordError, password]);

  function isLoginDisabled(): boolean {
    return !!emailError || !email || !!passwordError || !password;
  }

  async function handleFormSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      toast.loading("Please wait ...", {
        position: "bottom-center",
      });

      const isValidUser = await loginAction(formData);
      toast.dismiss();
      if (isValidUser?.unauthorized) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        setError("");
        const userRole = formData.get("role");
        const userEmail = formData.get("email");
        if (userEmail) {
          setUserData({
            email: userEmail.toString(),
            role: userRole?.toString() || "",
            action: "Login",
          });

          toast.success("OTP successfully sent !", {
            position: "bottom-center",
          });
          setShowOtp(true);
        }
      }
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    }
  }

  const showToast = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current?.name === "email") {
      if (emailError) {
        toast.error(emailError, {
          position: "bottom-center",
        });
      }
    }
    if (inputRef.current?.name === "password") {
      if (passwordError) {
        toast.error(passwordError, {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div className="h-screen w-screen grid place-items-center">
      <Card radius="lg" className="h-4/5 w-4/5 grid place-items-center">
        <div className="">
          <div className="flex justify-start items-center">
            <Image
              src="/icons/patient.svg"
              height="50"
              width="50"
              alt="brand-logo"
            />
            <h2 className="ml-2 font-bold text-lg">Patient Fitness Tracker</h2>
          </div>
          <div className="mt-5">
            <h3 className="text-3xl font-bold tracking-wider">
              Welcome Admin!
            </h3>
            <p className="text-[13px] text-gray-500">
              Please enter log in details below
            </p>
          </div>
        </div>
        <form
          className="flex flex-col h-full w-2/6"
          onSubmit={handleFormSubmit}
        >
          <Input
            name="email"
            variant="bordered"
            size="lg"
            type="email"
            placeholder="you@example.com"
            startContent={<MdOutlineAlternateEmail />}
            value={email}
            className="mx-2 my-1"
            onChange={handleEmailChange}
            ref={emailRef}
            onBlur={() => showToast(emailRef)}
            autoComplete="username"
          />
          <Input
            name="password"
            variant="bordered"
            size="lg"
            placeholder="Enter your password"
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
            autoComplete="current-password"
          />
          {/* <Select
            name="role"
            isRequired
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
          </Select> */}
          <Link
            // size="sm"
            href="#"
            underline="hover"
            className="self-right m-2 text-xs text-black/70"
          >
            Forget password?
          </Link>
          {/* passing the user data to otp section */}
          {showOtp && <OtpSection userData={userData} />}

          <Button
            type="submit"
            variant="shadow"
            className="text-white self-center bg-[#161313] text-sm tracking-wide rounded-lg w-5/6 h-12 my-2"
            isDisabled={loginDisabled}
          >
            Sign in
          </Button>
          <Toaster />
        </form>
      </Card>
    </div>
  );
}
