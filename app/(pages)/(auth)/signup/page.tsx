"use client";
import { useState, useRef, type ChangeEvent, useEffect } from "react";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { carouselData, roles } from "@constants/index";
import { Carousel, OtpSection } from "@components/index";
import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Selection,
  Link,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { MdAlternateEmail, MdOutlineKey } from "react-icons/md";
import { PiUserCircleDuotone } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { signupAction } from "@lib/actions";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null || String);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(null || String);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null || String);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null || String);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null || String);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [role, setRole] = useState<Selection>(new Set([]));
  const [roleTouched, setRoleTouched] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState({ email: "", role: "", action: "" });

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const isRoleValid = Array.from(role).length > 0;

  const toggleVisibility = () => setIsVisible(!isVisible);

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

    if (e.target.value !== passwordRef.current?.value) {
      setConfirmPasswordError(
        "Passwords do not match. Please ensure that your password and confirm password are identical."
      );
    }

    setconfirmPassword(e.target.value);
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

      const signUpSuccess = await signupAction(formData);
      toast.dismiss();

      if (signUpSuccess.failure) {
        toast.error(signUpSuccess.msg);
      } else {
        const userRole = formData.get("role");
        const userEmail = formData.get("email");
        if (userEmail) {
          setUserData({
            email: userEmail.toString(),
            role: userRole?.toString() || "",
            action: "Signup",
          });

          toast.success(
            "Almost done! Please use the OTP you received to complete signup. Thank you!",
            {
              position: "bottom-center",
            }
          );
          setShowOtp(true);
        }
      }
    } catch (error) {
      console.error("Error signing up");
      toast.error("Error signing up. Please try again!");
    }
  }

  useEffect(() => {
    setSubmitDisabled(isSubmitDisabled());
  }, [
    firstNameError,
    firstName,
    lastNameError,
    lastName,
    usernameError,
    username,
    emailError,
    email,
    passwordError,
    password,
    confirmPasswordError,
    confirmPassword,
    role,
  ]);

  function isSubmitDisabled(): boolean {
    return (
      !!firstNameError ||
      !firstName ||
      !!lastNameError ||
      !lastName ||
      !!usernameError ||
      !username ||
      !!emailError ||
      !email ||
      !!passwordError ||
      !password ||
      !!confirmPasswordError ||
      !confirmPassword ||
      !isRoleValid
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
          <Image
            src="/icons/patient.svg"
            height="40"
            width="40"
            alt="brand-logo"
          />
          <h2 className="ml-2 font-bold text-xl tracking-wide">
            Patient Fitness Tracker
          </h2>
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
              name="firstname"
              placeholder="First name"
              startContent={<IoPersonCircleOutline size={25} />}
              size="lg"
              value={firstName}
              className="mx-2 my-1"
              onChange={handleFirstNameChange}
              ref={firstNameRef}
              onBlur={() => showToast(firstNameRef)}
            />
            <Input
              type="text"
              variant="bordered"
              name="lastname"
              placeholder="Last name"
              startContent={<IoPersonCircleOutline size={25} />}
              size="lg"
              value={lastName}
              className="mx-2 my-1"
              onChange={handleLastNameChange}
              ref={lastNameRef}
              onBlur={() => showToast(lastNameRef)}
            />
          </div>
          <Input
            type="text"
            variant="bordered"
            name="username"
            placeholder="Username"
            startContent={<PiUserCircleDuotone size={25} />}
            size="lg"
            value={username}
            autoComplete="username"
            className="mx-2 my-1"
            onChange={handleUserNameChange}
            ref={usernameRef}
            onBlur={() => showToast(usernameRef)}
          />
          <Input
            type="email"
            variant="bordered"
            placeholder="you@example.com"
            name="email"
            startContent={<MdAlternateEmail size={20} />}
            size="lg"
            value={email}
            autoComplete="email"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
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
            isRequired
            items={roles}
            variant="bordered"
            size="md"
            label="Role"
            placeholder="Select who you are"
            className="mx-2 my-2"
            selectedKeys={role}
            onSelectionChange={setRole}
            onClose={() => setRoleTouched(true)}
            errorMessage={
              isRoleValid || !roleTouched ? "" : "You must select a role"
            }
            isInvalid={isRoleValid || !roleTouched ? false : true}
          >
            {(roles) => (
              <SelectItem key={roles.value}>{roles.label}</SelectItem>
            )}
          </Select>
          <Button
            type="submit"
            variant="shadow"
            className="text-white text-lg rounded-lg bg-[#0d0909] h-12 ml-4 my-2"
            isDisabled={submitDisabled}
          >
            Sign up
          </Button>
        </form>

        {/* passing the user data to otp section */}
        {showOtp && <OtpSection userData={userData} />}
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
