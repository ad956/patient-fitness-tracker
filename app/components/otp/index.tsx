"use client";

import setSessionReq from "@sessions/setSessionReq";
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
import toast, { Toaster } from "react-hot-toast";
import verifyOtp from "@lib/verifyOtp";

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

  const inputsRefs = Array.from({ length: 5 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    setOtp((prevOtp) => prevOtp + value);
    if (value && index < 4) {
      inputsRefs[index + 1].current?.focus();
    }
  };

  const handleSubmit = async () => {
    const data = await verifyOtp(userData.email, userData.role, otp);

    if (data.error) {
      setShowError(data.error);
    } else {
      setShowError("");

      const sendingOtpPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);

          setSessionReq(userData.email, userData.role);
          // router.push(`/${userData.role}`);
        }, 2000);
      });

      toast.promise(
        sendingOtpPromise,
        {
          loading: "Please wait...",
          success: "Login Success!",
          error: "Error while verifying OTP",
        },
        { position: "bottom-center" }
      );
    }
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
                    classNames={{
                      inputWrapper: "border-gray-500/40",
                    }}
                    color={showError ? "danger" : "default"}
                    maxLength={1}
                    onChange={(e) => handleInputChange(e, index)}
                    ref={inputsRefs[index]}
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
                className="my-2 bg-black/85 text-white"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
      <Toaster />
    </Modal>
  );
}
