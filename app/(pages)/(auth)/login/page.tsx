"use client";
import { useState, type ChangeEvent, useRef } from "react";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { carouselData, roles } from "@constants/index";
import { Carousel, OtpSection } from "@components/index";
import {
  Button,
  Input,
  Link,
  Select,
  SelectItem,
  Image,
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";
import { MdOutlineKey, MdOutlineAlternateEmail } from "react-icons/md";
import { loginAction } from "@lib/actions";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
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
    <div
      className={
        "bg-[#eef1f8] h-screen flex flex-col justify-center lg:flex-row  lg:justify-around"
      }
    >
      <div className="m-4 lg:w-1/4 flex flex-col gap-5 self-center">
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
          <Select
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
          </Select>
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
          <Modal
            isOpen={!!Error}
            onOpenChange={() => setError("")}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className="flex flex-col justify-center items-center">
                    <p className="text-red-600 tracking-wide font-bold">
                      {Error}
                    </p>
                    <Image
                      alt="for-wrong-password-use"
                      src="https://media.istockphoto.com/id/1412330792/vector/wrong-password-concept.jpg?s=612x612&w=0&k=20&c=N4BoF3wbVqB9Vwyu0K8d-RyhJIiRc-CZdmxkWsidg18="
                      height={200}
                      width={200}
                    />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          <Button
            type="submit"
            variant="shadow"
            className="text-white self-center bg-[#161313] text-sm tracking-wide rounded-lg w-5/6 h-12 my-2"
          >
            Sign in
          </Button>
        </form>

        {/* COMMENTED FOR NOW --- GOOGLE LOGIN */}
        {/* <div className="flex justify-center gap-5 items-center">
          <div className="h-[1px] w-28 bg-gray-500" />
          <div className="text-sm">or continue</div>
          <div className="h-[1px] w-28 bg-gray-500" />
        </div>

        <Button className="flex justify-center items-center gap-2 text-sm text-white bg-[#161313] rounded-lg w-5/6 h-12 mx-10">
          <Image src="google.svg" height="30" width="30" alt="google-sign-in" />{" "}
          Log in with Google
        </Button> */}
        <p className="text-gray-500 text-xs text-center">
          Don&#39;t have an account?
          <Link href="/signup" className="text-black text-xs">
            Sign Up
          </Link>
        </p>
        <Toaster />
      </div>
      {/* // right part only visible from lg */}
      <div className="hidden lg:w-2/5 m-2 bg-[#161313] rounded-t-2xl rounded-br-2xl  rounded-bl-[40px]  lg:flex lg:flex-col lg:justify-center lg:items-center">
        <Carousel data={carouselData} />
      </div>
    </div>
  );
}
