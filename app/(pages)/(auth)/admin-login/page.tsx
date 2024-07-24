"use client";

import OtpSection from "@components/OtpSection";
import { Input, Button, Link, Card, Image } from "@nextui-org/react";
import { AiOutlineEyeInvisible, AiTwotoneEye } from "react-icons/ai";
import { MdOutlineAlternateEmail, MdOutlineKey } from "react-icons/md";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { loginAction } from "@lib/actions";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState({ email: "", role: "", action: "" });
  const [isDesktop, setIsDesktop] = useState(true);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loginDisabled, setLoginDisabled] = useState(true);

  useEffect(() => {
    const checkDeviceType = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
      ];
      const isMobile = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );
      setIsDesktop(!isMobile);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(e.target.value);

    setEmailError(isValidEmail ? null : "Please enter a valid email address");
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = passwordRegex.test(e.target.value);
    const missingComponents = [];

    if (!/[a-z]/.test(e.target.value))
      missingComponents.push("lowercase letter");
    if (!/[A-Z]/.test(e.target.value))
      missingComponents.push("uppercase letter");
    if (!/[0-9]/.test(e.target.value)) missingComponents.push("number");
    if (!/[@$!%*?&]/.test(e.target.value))
      missingComponents.push("special character (@, $, !, %, *, ?, &)");

    setPasswordError(
      isValidPassword
        ? null
        : missingComponents.length > 0
        ? `Password must contain at least 8 characters, and ${missingComponents.join(
            ", "
          )}.`
        : "Password is too short. It must be at least 8 characters long."
    );
    setPassword(e.target.value);
  }

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setLoginDisabled(!!emailError || !email || !!passwordError || !password);
  }, [emailError, email, passwordError, password]);

  async function handleFormSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
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

  const showToast = (inputRef: React.RefObject<HTMLInputElement>) => {
    const error =
      inputRef.current?.name === "email" ? emailError : passwordError;
    if (error) {
      toast.error(error, { position: "bottom-center" });
    }
  };

  if (!isDesktop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card shadow="lg" className="w-full max-w-md p-6">
          <h2 className="text-xl font-bold text-center text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-center">
            This admin page is only accessible on desktop devices. Please use a
            desktop computer to access this site.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card shadow="lg" className="w-full max-w-md p-6">
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
            ref={emailRef}
            onBlur={() => showToast(emailRef)}
            autoComplete="username"
            isInvalid={!!emailError}
            errorMessage={emailError}
          />
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
            ref={passwordRef}
            onBlur={() => showToast(passwordRef)}
            autoComplete="current-password"
            isInvalid={!!passwordError}
            errorMessage={passwordError}
          />
          <Link href="#" size="sm" className="text-sm text-right block">
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
      <Toaster />
    </div>
  );
}
