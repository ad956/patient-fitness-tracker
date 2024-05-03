"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Image } from "@nextui-org/react";

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");

  const [secondsRemaining, setSecondsRemaining] = useState(5);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/login");
    }, secondsRemaining * 1000);

    const timerInterval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(timerInterval);
    };
  }, [router, secondsRemaining]);

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute">
        <Image
          alt="error-image"
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/media/a683df6fd0b57db02968b6194c88d868.gif"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 text-center p-8 z-10">
        {msg ? (
          <p className="text-lg text-gray-600">{msg}</p>
        ) : (
          <p className="text-lg text-gray-600">An unexpected error occurred.</p>
        )}
        <p className="mt-4 text-lg text-gray-700 font-bold py-2 px-4 rounded">
          You will be redirected to the login page in {secondsRemaining}{" "}
          seconds.{" "}
          <span className="cursor-pointer" onClick={redirectToLogin}>
            Click here
          </span>{" "}
          if not redirected.
        </p>
      </div>
    </div>
  );
}
