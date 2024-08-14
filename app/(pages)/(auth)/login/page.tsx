"use client";
import { useState, type ChangeEvent, useEffect } from "react";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { carouselData, roles } from "@constants/index";
import { Carousel, OtpSection } from "@components/index";
import {
  Button,
  Input,
  Link,
  Select,
  SelectItem,
  Selection,
  Image,
} from "@nextui-org/react";
import { MdOutlineKey, MdOutlineAlternateEmail } from "react-icons/md";
import { loginAction } from "@lib/actions";
import toast, { Toaster } from "react-hot-toast";
import FormValidator from "@utils/formValidator";
import { useRouter } from "next/navigation";
import handleDemoUserLogin from "@lib/demo-user/handleDemoUserLogin";

export default function Login() {
  const [formValidator] = useState(new FormValidator());
  const router = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Selection>(new Set([]));
  const [roleTouched, setRoleTouched] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState({
    usernameOrEmail: "",
    role: "",
    action: "",
  });

  const isRoleValid = Array.from(role).length > 0;

  const [loginDisabled, setLoginDisabled] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

  useEffect(() => {
    setLoginDisabled(
      formValidator.hasErrors() || !usernameOrEmail || !password || !isRoleValid
    );
  }, [usernameOrEmail, password, role]);

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
        toast.error("Invalid username | email or password. Please try again.");
      } else {
        const userRole = formData.get("role");
        setUserData({
          usernameOrEmail,
          role: userRole?.toString() || "",
          action: "Login",
        });

        toast.success("OTP successfully sent !", {
          position: "bottom-center",
        });
        setShowOtp(true);
      }
    } catch (error) {
      toast.error("Invalid username | email or password. Please try again.");
    }
  }

  async function handleForgetPassword() {
    if (!usernameOrEmail || userData.role === "") {
      toast.error(
        "Please enter a valid username or email address and select a role to continue.",
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
    <div
      className={
        "bg-[#eef1f8] h-screen flex flex-col justify-center lg:flex-row  lg:justify-around"
      }
    >
      <div className="m-4 lg:w-1/4 flex flex-col gap-5 self-center">
        <div className="flex justify-center items-center ">
          <Image
            src="/icons/patient.svg"
            height="50"
            width="50"
            alt="brand-logo"
          />
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
            name="usernameOrEmail"
            variant="bordered"
            size="lg"
            type="text"
            placeholder="Enter username or email"
            startContent={<MdOutlineAlternateEmail />}
            value={usernameOrEmail}
            className="mx-2 my-1"
            onChange={handleUsernameOrEmailChange}
            isInvalid={!!formValidator.getError("usernameOrEmail")}
            errorMessage={formValidator.getError("usernameOrEmail")}
            autoComplete="username"
          />
          <Input
            name="password"
            variant="bordered"
            size="lg"
            placeholder="Enter password"
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
            isInvalid={!!formValidator.getError("password")}
            errorMessage={formValidator.getError("password")}
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
          <Link
            underline="hover"
            className="self-right m-2 text-xs text-black/70 cursor-pointer"
            onClick={handleForgetPassword}
          >
            Forget password?
          </Link>
          {/* passing the user data to otp section */}
          {showOtp && <OtpSection userData={userData} />}

          <div className="flex flex-col sm:flex-row w-full gap-3 mt-4">
            <Button
              type="submit"
              className="w-full sm:w-2/3 bg-black text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              isDisabled={loginDisabled}
            >
              Sign in
            </Button>
            <Button
              type="button"
              className="w-full sm:w-1/3 bg-white text-black font-semibold py-3 rounded-lg border-2 border-black transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              onClick={() =>
                handleDemoUserLogin(
                  Array.from(role)[0] as string,
                  redirectDemoUser
                )
              }
            >
              Try Demo
            </Button>
          </div>
        </form>

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
