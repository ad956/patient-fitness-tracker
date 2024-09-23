"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Image } from "@nextui-org/react";
import SpinnerLoader from "@components/SpinnerLoader";

export default function SessionExpired() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const role = searchParams.get("role");

  useEffect(() => {
    if (secondsRemaining <= 0) {
      redirectToLogin();
      return;
    }

    const timerInterval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [secondsRemaining, role]);

  const redirectToLogin = () => {
    const loginPath = role === "admin" ? "/admin-login" : "/login";
    router.push(loginPath);
  };

  return (
    <Suspense fallback={<SpinnerLoader />}>
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute">
          <Image
            alt="error-image"
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/media/a683df6fd0b57db02968b6194c88d868.gif"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center p-8 z-10">
          <p className="text-lg text-gray-600">SESSION EXPIRED</p>
          <p className="mt-4 text-lg text-gray-700 font-bold py-2 px-4 rounded">
            {secondsRemaining > 0 ? (
              <>
                You will be redirected to the login page in {secondsRemaining}{" "}
                second{secondsRemaining !== 1 ? "s" : ""}.{" "}
              </>
            ) : (
              "Redirecting to login page... "
            )}
            <button
              onClick={redirectToLogin}
              className="cursor-pointer underline bg-transparent border-none text-inherit font-inherit"
            >
              Click here
            </button>{" "}
            if not redirected.
          </p>
        </div>
      </div>
    </Suspense>
  );
}
