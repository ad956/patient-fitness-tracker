"use client";

import { useState, useEffect } from "react";
import { Input, Button, Link, Card, Image } from "@nextui-org/react";
import { AiOutlineEyeInvisible, AiTwotoneEye } from "react-icons/ai";
import { MdOutlineAlternateEmail, MdOutlineKey } from "react-icons/md";
import toast from "react-hot-toast";
import { loginAction } from "@lib/actions";
import OtpSection from "@components/OtpSection";
import FormValidator from "@utils/formValidator";

export default function LoginForm() {
  const [formValidator] = useState(new FormValidator());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState({ email: "", role: "", action: "" });
  const [loginDisabled, setLoginDisabled] = useState(true);

  function handleEmailChange(e: any) {
    const error = FormValidator.validateEmail(e.target.value);
    formValidator.setError("email", error);
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: any) {
    const error = FormValidator.validatePassword(e.target.value);
    formValidator.setError("password", error);
    setPassword(e.target.value);
  }

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setLoginDisabled(formValidator.hasErrors() || !email || !password);
  }, [email, password]);

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      toast.loading("Please wait ...", { position: "bottom-center" });
      const isValidUser = await loginAction(formData);
      toast.dismiss();

      if (isValidUser?.unauthorized) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        const userEmail = formData.get("email");
        if (userEmail) {
          setUserData({
            email: userEmail.toString(),
            role: "admin",
            action: "Login",
          });
          toast.success("OTP successfully sent!", {
            position: "bottom-center",
          });
          setShowOtp(true);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }

  async function handleForgetPassword() {
    if (!email) {
      toast.error("Please enter a valid email address to continue.", {
        position: "bottom-center",
        duration: 2000,
      });
    }
  }

  return (
    <Card shadow="lg" className="h4/5 w-full max-w-md p-6">
      <div className="flex items-center mb-6">
        <Image
          src="/icons/patient.svg"
          alt="brand-logo"
          width={40}
          height={40}
        />
        <h2 className="ml-2 text-xl font-bold">Patient Fitness Tracker</h2>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Welcome Admin!</h3>
        <p className="text-sm text-gray-500">
          Please enter your login details below
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <Input
          name="email"
          label="Email"
          variant="bordered"
          size="lg"
          type="email"
          placeholder="you@example.com"
          startContent={<MdOutlineAlternateEmail />}
          value={email}
          onChange={handleEmailChange}
          autoComplete="username"
          isInvalid={!!formValidator.getError("email")}
          errorMessage={formValidator.getError("email")}
        />
        <input name="role" type="hidden" value="admin" />
        <Input
          name="password"
          label="Password"
          variant="bordered"
          size="lg"
          placeholder="Enter your password"
          startContent={<MdOutlineKey />}
          value={password}
          onChange={handlePasswordChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <AiOutlineEyeInvisible className="text-2xl text-default-400" />
              ) : (
                <AiTwotoneEye className="text-2xl text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          autoComplete="current-password"
          isInvalid={!!formValidator.getError("password")}
          errorMessage={formValidator.getError("password")}
        />
        <Link
          href="#"
          size="sm"
          className="text-sm text-right block"
          onClick={handleForgetPassword}
        >
          Forgot password?
        </Link>
        {showOtp && <OtpSection userData={userData} />}
        <Button
          type="submit"
          size="lg"
          className="w-full text-white self-center bg-[#161313]"
          isDisabled={loginDisabled}
        >
          Sign in
        </Button>
      </form>
    </Card>
  );
}
