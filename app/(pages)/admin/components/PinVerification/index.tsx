"use client";

import { useState, useEffect } from "react";
import { Card, Input, Button } from "@nextui-org/react";

export default function PinVerification({ onVerified }: any) {
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [dailyNumbers, setDailyNumbers] = useState({ num1: 0, num2: 0 });

  useEffect(() => {
    generateDailyNumbers();
  }, []);

  const generateDailyNumbers = () => {
    const today = new Date();
    const num1 = today.getDate();
    const num2 = today.getMonth() + 1;
    setDailyNumbers({ num1, num2 });
  };

  const calculateCorrectPin = () => {
    return (dailyNumbers.num1 * dailyNumbers.num2).toString().padStart(4, "0");
  };

  const handlePinSubmit = (e: any) => {
    e.preventDefault();
    if (pin === calculateCorrectPin()) {
      onVerified();
      setPinError("");
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  return (
    <Card
      shadow="lg"
      className="w-full max-w-md p-8 bg-white/90 backdrop-blur-md"
    >
      <div className="flex flex-col items-center mb-6">
        <LockIcon className="w-16 h-16 text-indigo-600 mb-4" />
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your 4-digit PIN to access the admin panel
        </p>
      </div>
      <form onSubmit={handlePinSubmit} className="space-y-6">
        <Input
          type="password"
          label="PIN"
          placeholder="••••"
          labelPlacement="outside"
          autoComplete="current-password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={4}
          className="text-2xl text-center"
          size="lg"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-gray-400 text-small">4 digits</span>
            </div>
          }
        />
        {pinError && (
          <p className="text-red-500 text-sm text-center">{pinError}</p>
        )}
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          size="lg"
        >
          Access Admin Panel
        </Button>
      </form>
    </Card>
  );
}

const LockIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
      clipRule="evenodd"
    />
  </svg>
);
