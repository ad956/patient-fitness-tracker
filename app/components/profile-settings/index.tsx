"use client";

import { User } from "@types";
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
import {
  updatePersonal,
  updateAddress,
  resetPassword,
} from "@lib/update-profile";
import FormValidator from "@utils/formValidator";

type ProfileSettingsProps = {
  user: User;
};

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const [formValidator] = useState(new FormValidator());

  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastName] = useState(user.lastname);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [profilePicture, setProfilePicture] = useState(user.profile);
  const [dob, setDob] = useState<DateValue>(parseDate(user.dob));
  const [contact, setContact] = useState(user.contact);
  const [gender, setGender] = useState(user.gender);
  const [address, setAddress] = useState({
    address_line_1: user.address.address_line_1 || "",
    address_line_2: user.address.address_line_2 || "",
    city: user.address.city || "",
    state: user.address.state || "",
    zip_code: user.address.zip_code || "",
    country: user.address.country || "",
  });

  const [isVisible, setIsVisible] = useState(true);
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setUpdateDisabled(isUpdateDisabled());
  }, [
    firstname,
    lastname,
    username,
    email,
    currentPassword,
    newPassword,
    dob,
    contact,
    gender,
    address,
  ]);

  function isUpdateDisabled(): boolean {
    return (
      formValidator.hasErrors() ||
      !email ||
      !currentPassword ||
      !newPassword ||
      !dob ||
      !gender ||
      !address
    );
  }

  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
    const error = FormValidator.validateName(e.target.value, "firstname");
    formValidator.setError("firstName", error);
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    const error = FormValidator.validateName(e.target.value, "lastname");
    formValidator.setError("lastName", error);
    setLastName(e.target.value);
  }

  function handleUserNameChange(e: ChangeEvent<HTMLInputElement>) {
    const error = FormValidator.validateUsername(e.target.value);
    formValidator.setError("username", error);
    setUsername(e.target.value);
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const error = FormValidator.validateEmail(e.target.value);
    formValidator.setError("email", error);
    setEmail(e.target.value);
  }

  function handleCurrentPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const error = FormValidator.validatePassword(e.target.value);
    formValidator.setError("currentpassword", error);
    setCurrentPassword(e.target.value);
  }

  function handleNewPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const error = FormValidator.validatePassword(e.target.value);
    formValidator.setError("newpassword", error);
    setNewPassword(e.target.value);
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
    const error = FormValidator.validateContact(e.target.value);
    formValidator.setError("contact", error);
    setContact(e.target.value);
  };

  const handleAddressChange =
    (field: keyof typeof address) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAddress({ ...address, [field]: e.target.value });
      const errors = FormValidator.validateAddress({
        ...address,
        [field]: e.target.value,
      });

      formValidator.setError(`address.${field}`, errors[field]);
    };

  const UpdateButton = ({ onUpdate }: { onUpdate: () => void }) => {
    return (
      <Button
        // isDisabled={updateDisabled} // to be done
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
    toast.loading("Please wait");

    const updatedFields = {
      firstname: firstname !== user.firstname ? firstname : undefined,
      lastname: lastname !== user.lastname ? lastname : undefined,
      username: username !== user.username ? username : undefined,
      email: email !== user.email ? email : undefined,
      dob: dob.toString() !== user.dob ? dob.toString() : undefined,
      gender: gender !== user.gender ? gender : undefined,
      contact: contact !== user.contact ? contact : undefined,
    };

    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(filteredFields).length > 0) {
      try {
        const response = await updatePersonal(filteredFields);

        toast.dismiss();

        if (response.msg) {
          toast.success("Personal information updated successfully");
        } else {
          toast.error("Failed to update personal information");
        }
      } catch (error) {
        console.error("Error updating personal information:", error);
        toast.error("An error occurred while updating personal information");
      }
    } else {
      toast.dismiss();
      toast.success("No changes to update");
    }
  };

  const updateAddressInfo = async () => {
    toast.loading("Please wait");
    const updatedFields = {
      address_line_1:
        address.address_line_1 !== user.address.address_line_1
          ? address.address_line_1
          : undefined,
      address_line_2:
        address.address_line_2 !== user.address.address_line_2
          ? address.address_line_2
          : undefined,
      city: address.city !== user.address.city ? address.city : undefined,
      state: address.state !== user.address.state ? address.state : undefined,
      zip_code:
        address.zip_code !== user.address.zip_code
          ? address.zip_code
          : undefined,
      country:
        address.country !== user.address.country ? address.country : undefined,
    };

    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(filteredFields).length > 0) {
      try {
        const response = await updateAddress(filteredFields);

        toast.dismiss();

        if (response.msg) {
          toast.success("Address information updated successfully");
        } else {
          toast.error("Failed to update address information");
        }
      } catch (error) {
        console.error("Error updating address information:", error);
        toast.error("An error occurred while updating address information");
      }
    } else {
      toast.dismiss();
      toast.success("No changes to update");
    }
  };

  const updateSecurityInfo = async () => {
    toast.loading("Please wait");

    if (currentPassword && currentPassword !== newPassword) {
      try {
        const response = await resetPassword(currentPassword, newPassword);

        toast.dismiss();

        if (response.msg) {
          toast.success("Password updated successfully");
          setCurrentPassword("");
          setNewPassword("");
        } else {
          toast.error(response.error, {
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error updating password:", error);
        toast.error("An error occurred while updating password");
      }
    } else if (currentPassword === newPassword) {
      toast.dismiss();
      toast.error("New password cannot be the same as the current password");
    } else {
      toast.dismiss();
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
          <h2 className="text-xl font-semibold">{`${user.firstname} ${user.lastname}`}</h2>
          <p className="text-gray-500">@{user.username}</p>
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
                  onBlur={() => formValidator.showToast("firstname")}
                />
                <Input
                  name="lastname"
                  type="text"
                  variant="underlined"
                  label="Last Name"
                  value={lastname}
                  className="max-w-xs"
                  onChange={handleLastNameChange}
                  onBlur={() => formValidator.showToast("lastname")}
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
                  onBlur={() => formValidator.showToast("username")}
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
                  onBlur={() => formValidator.showToast("email")}
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
                  onBlur={() => formValidator.showToast("contact")}
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
                  onBlur={() =>
                    formValidator.showToast("address.address_line_1")
                  }
                />
                <Textarea
                  name="address_line_2"
                  variant="underlined"
                  label="Address Line 2"
                  value={address.address_line_2}
                  className="max-w-xs"
                  onChange={handleAddressChange("address_line_2")}
                  onBlur={() =>
                    formValidator.showToast("address.address_line_2")
                  }
                />
                <Input
                  name="city"
                  type="text"
                  variant="underlined"
                  label="City"
                  value={address.city}
                  className="max-w-xs"
                  onChange={handleAddressChange("city")}
                  onBlur={() => formValidator.showToast("address.city")}
                />
                <Input
                  name="state"
                  type="text"
                  variant="underlined"
                  label="State"
                  value={address.state}
                  className="max-w-xs"
                  onChange={handleAddressChange("state")}
                  onBlur={() => formValidator.showToast("address.state")}
                />
                <Input
                  name="zip_code"
                  type="text"
                  variant="underlined"
                  label="Zip Code"
                  value={address.zip_code}
                  className="max-w-xs"
                  onChange={handleAddressChange("zip_code")}
                  onBlur={() => formValidator.showToast("address.zip_code")}
                />
                <Input
                  name="country"
                  type="text"
                  variant="underlined"
                  label="Country"
                  value={address.country}
                  className="max-w-xs"
                  onChange={handleAddressChange("country")}
                  onBlur={() => formValidator.showToast("address.country")}
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
                  name="currentpassword"
                  type={isVisible ? "text" : "password"}
                  variant="underlined"
                  label="Current Password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
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
                  onBlur={() => formValidator.showToast("currentpassword")}
                />
                <Input
                  name="newpassword"
                  type={isVisible ? "text" : "password"}
                  variant="underlined"
                  label="New Password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
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
                  onBlur={() => formValidator.showToast("confirmpassword")}
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
