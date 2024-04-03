"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  Image,
  useDisclosure,
  Input,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type userDataType = {
  userData: {
    email: string;
    role: string;
  };
};

export default function OtpSection({ userData }: userDataType) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [otp, setOtp] = useState<Array<string>>(["", "", "", "", ""]);
  const [showError, setShowError] = useState("");

  const router = useRouter();
  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/auth/verifyotp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         otp: otp,
  //         email: userData.email,
  //         role: userData.role,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.error) {
  //       setShowError(data.error);
  //     } else {
  //       setShowError("");
  //       router.push(`/${userData.role}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Ref to store references to input elements

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If more than one digit entered, take only the last digit
      value = value[value.length - 1];
    }

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value; // Update the specific index with the entered value
      return newOtp;
    });

    if (value && inputRefs.current[index + 1]) {
      // Move cursor to the next input field if there's a value and next input field exists
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    if (otp[index] === "") {
      // Move cursor to the previous input field if the current field is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join(""); // Combine individual digits to form OTP
    // Your submission logic here
  };

  return (
    <Modal isOpen={true} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent className="p-2">
        {(onClose) => (
          <>
            <ModalBody className="flex flex-col justify-center items-center">
              <p className="text-black/80 tracking-wide font-bold">
                Enter your OTP
              </p>
              <Image
                src="https://cdni.iconscout.com/illustration/premium/thumb/otp-code-to-unlock-4718239-3916139.png"
                height={200}
                width={200}
              />

              <div className="flex justify-center gap-2 w-full">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)} // Assign ref to input element
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onFocus={() => handleFocus(index)}
                  />
                ))}
              </div>

              {showError && (
                <p className="text-md font-semibold text-danger">
                  OTP is not valid
                </p>
              )}

              <Button
                variant="shadow"
                className="my-2 bg-[#c2d3fc]"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
