"use client";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="h-full w-full flex justify-center gap-5 items-center">
      <div className="flex flex-col gap-5">
        <h2 className="text-[#606060] font-bold tracking-wider text-5xl">
          Oops! Sorry <br /> page does not found
        </h2>
        <p className="font-medium text-2xl text-black/55">
          Could not find requested resource
        </p>
        <Button
          onClick={() => router.back()}
          className="bg-[#00b09c] text-[#e5e5dd] text-md font-semibold my-5 max-w-32"
        >
          Go Back
        </Button>
      </div>

      <div className="h-full">
        <Image src="/images/404.jpg" className="h-full" />
      </div>
    </div>
  );
}
