"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input, Button, Link, Card, Image } from "@nextui-org/react";
import { AiOutlineEyeInvisible, AiTwotoneEye } from "react-icons/ai";
import { MdOutlineAlternateEmail, MdOutlineKey } from "react-icons/md";
import toast from "react-hot-toast";
import { loginAction } from "@lib/actions";
import OtpSection from "@components/OtpSection";
import FormValidator from "@utils/formValidator";
import { useRouter } from "next/navigation";
import handleDemoUserLogin from "@lib/demo-user/handleDemoUserLogin";

export default function LoginForm() {
  const [formValidator] = useState(new FormValidator());
  const router = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState({
    usernameOrEmail: "",
    role: "",
    action: "",
  });
  const [loginDisabled, setLoginDisabled] = useState(true);

  function handleUsernameOrEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setUsernameOrEmail(value);

    let error: any;

    if (!value) {
      error = "Username or email is required";
    } else {
      const isEmail = value.includes("@");

      if (isEmail) {
        error = FormValidator.validateEmail(value);
      } else {
        error = FormValidator.validateUsername(value);
      }
    }

    formValidator.setError("usernameOrEmail", error);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const error = FormValidator.validatePassword(e.target.value);
    formValidator.setError("password", error);
    setPassword(e.target.value);
  }

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setLoginDisabled(
      formValidator.hasErrors() || !usernameOrEmail || !password
    );
  }, [usernameOrEmail, password]);

  async function handleFormSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      toast.loading("Please wait ...", { position: "bottom-center" });

      const response = await loginAction(formData);
      toast.dismiss();

      if (response.error) {
        toast.error(`${response.error.message}`);
      } else {
        setUserData({
          usernameOrEmail,
          role: "admin",
          action: "Login",
        });
        toast.success("OTP successfully sent!", {
          position: "bottom-center",
        });
        setShowOtp(true);
      }
    } catch (error) {
      toast.dismiss();
      console.error("Admin Login failed:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }

  async function handleForgetPassword() {
    if (!usernameOrEmail) {
      toast.error(
        "Please enter a valid username or email address to continue.",
        {
          position: "bottom-center",
          duration: 2000,
        }
      );
    }
  }

  const redirectDemoUser = (role: string) => {
    router.push(`/${role}`);
  };

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
          name="usernameOrEmail"
          label="Identifier"
          variant="bordered"
          size="lg"
          type="text"
          placeholder="Enter username or email"
          startContent={<MdOutlineAlternateEmail className="mb-[3px]" />}
          value={usernameOrEmail}
          onChange={handleUsernameOrEmailChange}
          autoComplete="username"
          isInvalid={!!formValidator.getError("usernameOrEmail")}
          errorMessage={formValidator.getError("usernameOrEmail")}
        />
        <input name="role" type="hidden" value="admin" />
        <Input
          name="password"
          label="Password"
          variant="bordered"
          size="lg"
          placeholder="Enter password"
          startContent={<MdOutlineKey className="mb-[3px]" />}
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

        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-3 mt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full text-white bg-[#161313] py-5 rounded-lg self-center sm:w-2/3"
            isDisabled={loginDisabled}
          >
            Sign in
          </Button>

          <Button
            type="button"
            className="w-full sm:w-1/3 bg-white text-black font-semibold py-5 rounded-lg border-2 border-black transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={() => handleDemoUserLogin("admin", redirectDemoUser)}
          >
            Try Demo
          </Button>
        </div>
      </form>
    </Card>
  );
}
