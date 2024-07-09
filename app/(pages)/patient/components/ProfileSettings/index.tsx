"use client";

import { Patient } from "@types";
import {
  Input,
  Button,
  Card,
  Avatar,
  Tooltip,
  DatePicker,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React, { type ChangeEvent, useRef, useState, useEffect } from "react";
import { AiTwotoneEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { DateValue, parseDate } from "@internationalized/date";
import { updateProfilePicture } from "@lib/patient";
import { FaLock, FaUser } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ProfileSettings({ patient }: { patient: Patient }) {
  const [isVisible, setIsVisible] = useState(true);

  const [firstname, setFirstName] = useState(patient.firstname);
  const [firstNameError, setFirstNameError] = useState(null || String);
  const [lastname, setLastName] = useState(patient.lastname);
  const [lastNameError, setLastNameError] = useState(null || String);
  const [username, setUsername] = useState(patient.username);
  const [usernameError, setUsernameError] = useState(null || String);
  const [email, setEmail] = useState(patient.email);
  const [emailError, setEmailError] = useState(null || String);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null || String);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    null || String
  );
  const [profilePicture, setProfilePicture] = useState(patient.profile);
  const [dob, setDob] = useState<DateValue>(parseDate(patient.dob));
  const [contact, setContact] = useState(patient.contact);
  const [contactError, setContactError] = useState(null || String);
  const [gender, setGender] = useState(patient.gender);
  const [address, setAddress] = useState({
    address_line_1: patient.address.address_line_1 || "",
    address_line_2: patient.address.address_line_2 || "",
    city: patient.address.city || "",
    state: patient.address.state || "",
    zip_code: patient.address.zip_code || "",
    country: patient.address.country || "",
  });
  const [addressErrors, setAddressErrors] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  });
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const addressLine1Ref = useRef<HTMLTextAreaElement>(null);
  const addressLine2Ref = useRef<HTMLTextAreaElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const zipCodeRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

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
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(
      e.target.value === password ? "" : "Passwords do not match"
    );
  }

  const isDateInvalid = (): boolean => {
    const birthDate = dob;
    const today = new Date();
    let age = today.getFullYear() - birthDate.year;
    const m = today.getMonth() - birthDate.month;
    if (m < 0 || (m === 0 && today.getDate() < birthDate.day)) {
      age--;
    }
    if (age < 18 || age > 100) return true;
    return false;
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d{10}$/;
    const isContactValid = regex.test(e.target.value);

    setContactError(
      isContactValid ? "" : "Please enter a 10-digit phone number"
    );
    setContact(e.target.value);
  };

  const handleAddressChange =
    (field: keyof typeof address) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAddress({ ...address, [field]: e.target.value });
      validateAddressField(field, e.target.value);
    };

  const validateAddressField = (field: keyof typeof address, value: string) => {
    let error = "";
    switch (field) {
      case "address_line_1":
        error = value ? "" : "Address Line 1 is required";
        break;
      case "city":
        error = value ? "" : "City is required";
        break;
      case "state":
        error = value ? "" : "State is required";
        break;
      case "zip_code":
        const zipCodeRegex = /^\d{5}(-\d{4})?$/;
        error = zipCodeRegex.test(value) ? "" : "Please enter a valid ZIP code";
        break;
      case "country":
        error = value ? "" : "Country is required";
        break;
    }
    setAddressErrors({ ...addressErrors, [field]: error });
  };

  useEffect(() => {
    setUpdateDisabled(isUpdateDisabled());
  }, [
    firstNameError,
    firstname,
    lastNameError,
    lastname,
    usernameError,
    username,
    emailError,
    email,
    passwordError,
    password,
    confirmPasswordError,
    confirmPassword,
    addressErrors,
  ]);

  function isUpdateDisabled(): boolean {
    return (
      !!firstNameError ||
      !firstname ||
      !!lastNameError ||
      !lastname ||
      !!usernameError ||
      !username ||
      !!emailError ||
      !email ||
      !!passwordError ||
      !password ||
      !!confirmPasswordError ||
      !confirmPassword ||
      Object.values(addressErrors).some((error) => !!error)
    );
  }

  const showToast = (
    inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    if (inputRef.current?.name === "password") {
      if (passwordError) {
        toast.error(passwordError, {
          position: "bottom-center",
        });
      }
    }
    if (inputRef.current?.name === "confirmpassword") {
      if (confirmPasswordError) {
        toast.error(confirmPasswordError, {
          position: "bottom-center",
        });
      }
    }
    if (inputRef.current?.name === "contact") {
      if (contactError) {
        toast.error(contactError, {
          position: "bottom-center",
        });
      }
    }
    if (inputRef.current?.name === "address_line_1") {
      if (addressErrors.address_line_1) {
        toast.error(addressErrors.address_line_1, {
          position: "bottom-center",
        });
      }
    }
    if (inputRef.current?.name === "city") {
      if (addressErrors.city) {
        toast.error(addressErrors.city, { position: "bottom-center" });
      }
    }
    if (inputRef.current?.name === "state") {
      if (addressErrors.state) {
        toast.error(addressErrors.state, { position: "bottom-center" });
      }
    }
    if (inputRef.current?.name === "zip_code") {
      if (addressErrors.zip_code) {
        toast.error(addressErrors.zip_code, { position: "bottom-center" });
      }
    }
    if (inputRef.current?.name === "country") {
      if (addressErrors.country) {
        toast.error(addressErrors.country, { position: "bottom-center" });
      }
    }
  };

  const UpdateButton = ({ onUpdate }: { onUpdate: () => void }) => {
    return (
      <Button
        onClick={onUpdate}
        color="danger"
        variant="shadow"
        className="mt-6"
      >
        Update
      </Button>
    );
  };

  const updatePersonalInfo = async () => {
    const updatedFields = {
      firstname: firstname !== patient.firstname ? firstname : undefined,
      lastname: lastname !== patient.lastname ? lastname : undefined,
      username: username !== patient.username ? username : undefined,
      email: email !== patient.email ? email : undefined,
      dob: dob.toString() !== patient.dob ? dob.toString() : undefined,
      gender: gender !== patient.gender ? gender : undefined,
      contact: contact !== patient.contact ? contact : undefined,
    };

    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(filteredFields).length > 0) {
      try {
        const response = await fetch(`/api/patient/update-profile/personal`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filteredFields),
        });

        if (response.ok) {
          toast.success("Personal information updated successfully");
        } else {
          const res = await response.json();
          toast.error(res.error);
        }
      } catch (error) {
        console.error("Error updating personal information:", error);
        toast.error("An error occurred while updating personal information");
      }
    } else {
      toast.success("No changes to update");
    }
  };

  const updateAddressInfo = async () => {
    const updatedFields = {
      address_line_1:
        address.address_line_1 !== patient.address.address_line_1
          ? address.address_line_1
          : undefined,
      address_line_2:
        address.address_line_2 !== patient.address.address_line_2
          ? address.address_line_2
          : undefined,
      city: address.city !== patient.address.city ? address.city : undefined,
      state:
        address.state !== patient.address.state ? address.state : undefined,
      zip_code:
        address.zip_code !== patient.address.zip_code
          ? address.zip_code
          : undefined,
      country:
        address.country !== patient.address.country
          ? address.country
          : undefined,
    };

    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(filteredFields).length > 0) {
      try {
        const response = await fetch(`/api/patient/update-profile/address`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filteredFields),
        });

        if (response.ok) {
          toast.success("Address information updated successfully");
        } else {
          toast.error("Failed to update address information");
        }
      } catch (error) {
        console.error("Error updating address information:", error);
        toast.error("An error occurred while updating address information");
      }
    } else {
      toast.success("No changes to update");
    }
  };

  const updateSecurityInfo = async () => {
    if (password && password === confirmPassword) {
      try {
        const response = await fetch(
          `/api/patient/update-profile/reset-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
          }
        );

        if (response.ok) {
          toast.success("Password updated successfully");
          setPassword("");
          setConfirmPassword("");
        } else {
          toast.error("Failed to update password");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        toast.error("An error occurred while updating password");
      }
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      toast.success("No changes to update");
    }
  };

  const [activeTab, setActiveTab] = useState("personal");

  return (
    <Card
      radius="lg"
      shadow="lg"
      className="flex flex-row gap-5 items-start p-5 h-full w-full overflow-y-auto"
    >
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 border-r border-gray-200">
        <div className="flex flex-col items-center mb-8">
          <CldUploadWidget
            signatureEndpoint="/api/cloudinary/sign-image"
            onSuccess={async (result) => {
              const info = result.info as CloudinaryUploadWidgetInfo;
              const isProfileUpdated = await updateProfilePicture(
                info.secure_url
              );
              if (isProfileUpdated.error) {
                toast.error(isProfileUpdated.error);
                return;
              }
              setProfilePicture(info.secure_url);
              toast.success("Profile picture updated successfully");
            }}
          >
            {({ open }) => (
              <Tooltip content="Click to Update Your Profile Picture">
                <Avatar
                  src={profilePicture}
                  className="w-32 h-32 text-large cursor-pointer mb-4"
                  onClick={() => open()}
                />
              </Tooltip>
            )}
          </CldUploadWidget>
          <h2 className="text-xl font-semibold">{`${firstname} ${lastname}`}</h2>
          <p className="text-gray-500">@{username}</p>
        </div>
        <nav>
          {["personal", "address", "security"].map((tab) => (
            <Button
              size="md"
              key={tab}
              className={`flex justify-start items-center bg-transparent w-4/5 p-3 mb-2 transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-blue100 bg-[#1f1c2e] text-white ext-blue-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "personal" && <FaUser className="mr-3" />}
              {tab === "address" && <FaMapMarkerAlt className="mr-3" />}
              {tab === "security" && <FaLock className="mr-3" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Info
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        <div className="relative">
          {/* Personal Information */}
          <div
            className={`absolute w-full transition-all duration-300 ease-in-out ${
              activeTab === "personal" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="firstname"
                  type="text"
                  variant="underlined"
                  label="First Name"
                  value={firstname}
                  className="max-w-xs"
                  onChange={handleFirstNameChange}
                  ref={firstNameRef}
                  onBlur={() => showToast(firstNameRef)}
                />
                <Input
                  name="lastname"
                  type="text"
                  variant="underlined"
                  label="Last Name"
                  value={lastname}
                  className="max-w-xs"
                  onChange={handleLastNameChange}
                  ref={lastNameRef}
                  onBlur={() => showToast(lastNameRef)}
                />
                <Input
                  name="username"
                  type="text"
                  variant="underlined"
                  label="Username"
                  autoComplete="username"
                  value={username}
                  className="max-w-xs"
                  onChange={handleUserNameChange}
                  ref={usernameRef}
                  onBlur={() => showToast(usernameRef)}
                />
                <Input
                  name="email"
                  type="email"
                  variant="underlined"
                  label="Email address"
                  value={email}
                  className="max-w-xs"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  ref={emailRef}
                  onBlur={() => showToast(emailRef)}
                />
                <Select
                  name="gender"
                  variant="underlined"
                  label="Gender"
                  value={gender}
                  defaultSelectedKeys={[gender]}
                  className="max-w-xs"
                  onChange={handleGenderChange}
                >
                  {["Male", "Female", "Other"].map((item) => (
                    <SelectItem key={item}>{item}</SelectItem>
                  ))}
                </Select>
                <DatePicker
                  name="dob"
                  label="DOB"
                  variant="underlined"
                  className="max-w-xs"
                  value={dob}
                  onChange={(val) => setDob(val)}
                  showMonthAndYearPickers
                  isInvalid={isDateInvalid()}
                  errorMessage={(value) => {
                    if (value.isInvalid) {
                      return "Please enter a valid date.";
                    }
                  }}
                />
                <Input
                  name="contact"
                  type="text"
                  variant="underlined"
                  label="Phone"
                  value={contact}
                  className="max-w-xs"
                  onChange={handleContactChange}
                  ref={contactRef}
                  onBlur={() => showToast(contactRef)}
                />
              </div>
            </Card>
            <UpdateButton onUpdate={updatePersonalInfo} />
          </div>

          {/* Address Information */}
          <div
            className={`absolute w-full transition-all duration-300 ease-in-out ${
              activeTab === "address" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Address Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Textarea
                  name="address_line_1"
                  variant="underlined"
                  label="Address Line 1"
                  value={address.address_line_1}
                  className="max-w-xs"
                  onChange={handleAddressChange("address_line_1")}
                  ref={addressLine1Ref}
                  onBlur={() => showToast(addressLine1Ref)}
                  errorMessage={addressErrors.address_line_1}
                />
                <Textarea
                  name="address_line_2"
                  variant="underlined"
                  label="Address Line 2"
                  value={address.address_line_2}
                  className="max-w-xs"
                  onChange={handleAddressChange("address_line_2")}
                  ref={addressLine2Ref}
                />
                <Input
                  name="city"
                  type="text"
                  variant="underlined"
                  label="City"
                  value={address.city}
                  className="max-w-xs"
                  onChange={handleAddressChange("city")}
                  ref={cityRef}
                  onBlur={() => showToast(cityRef)}
                  errorMessage={addressErrors.city}
                />
                <Input
                  name="state"
                  type="text"
                  variant="underlined"
                  label="State"
                  value={address.state}
                  className="max-w-xs"
                  onChange={handleAddressChange("state")}
                  ref={stateRef}
                  onBlur={() => showToast(stateRef)}
                  errorMessage={addressErrors.state}
                />
                <Input
                  name="zip_code"
                  type="text"
                  variant="underlined"
                  label="Zip Code"
                  value={address.zip_code}
                  className="max-w-xs"
                  onChange={handleAddressChange("zip_code")}
                  ref={zipCodeRef}
                  onBlur={() => showToast(zipCodeRef)}
                  errorMessage={addressErrors.zip_code}
                />
                <Input
                  name="country"
                  type="text"
                  variant="underlined"
                  label="Country"
                  value={address.country}
                  className="max-w-xs"
                  onChange={handleAddressChange("country")}
                  ref={countryRef}
                  onBlur={() => showToast(countryRef)}
                  errorMessage={addressErrors.country}
                />
              </div>
            </Card>
            <UpdateButton onUpdate={updateAddressInfo} />
          </div>

          {/* Security Settings */}
          <div
            className={`absolute w-full transition-all duration-300 ease-in-out ${
              activeTab === "security" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  variant="underlined"
                  label="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="max-w-xs"
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
                  ref={passwordRef}
                  onBlur={() => showToast(passwordRef)}
                />
                <Input
                  name="confirmpassword"
                  type={isVisible ? "text" : "password"}
                  variant="underlined"
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="max-w-xs"
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
                  ref={confirmPasswordRef}
                  onBlur={() => showToast(confirmPasswordRef)}
                />
              </div>
            </Card>
            <UpdateButton onUpdate={updateSecurityInfo} />
          </div>
        </div>
      </div>
      <Toaster />
    </Card>
  );
}
