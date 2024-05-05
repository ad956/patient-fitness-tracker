"use client";

import { Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center gap-5 items-center">
      <div className="flex flex-col gap-5">
        <h2 className="text-[#606060] font-bold tracking-wider text-5xl">
          Oops! Sorry <br />
        </h2>
        <p className="font-medium text-2xl text-black/55">{error.message}</p>
        <Button
          onClick={() => router.replace("/")}
          className="bg-[#00b09c] text-[#e5e5dd] text-md font-semibold my-5 max-w-32"
        >
          Go Back
        </Button>
      </div>

      <div className="h-full">
        <Image alt="error-image" src="/images/error.jpg" className="h-full" />
      </div>
    </div>
  );
}
