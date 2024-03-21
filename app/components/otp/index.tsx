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
import React, { useState } from "react";

type userDataType = {
  userData: {
    email: string;
    role: string;
  };
};

export default function OtpSection({ userData }: userDataType) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [otp, setOtp] = useState("");
  const [showError, setShowError] = useState("");

  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp,
          email: userData.email,
          role: userData.role,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setShowError(data.error);
      } else {
        setShowError("");
        router.push(`/${userData.role}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtp((prevOtp) => prevOtp + value);
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
                {[...Array(5)].map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    variant={showError ? "flat" : "bordered"}
                    className="max-w-10"
                    color={showError ? "danger" : "default"}
                    maxLength={1}
                    onChange={handleInputChange}
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
