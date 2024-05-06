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
    // <div className="h-screen flex justify-center gap-5 items-center">
    //   <div className="flex flex-col gap-5">
    //     <h2 className="text-[#606060] font-bold tracking-wider text-5xl">
    //       Oops! Sorry <br />
    //     </h2>
    //     <p className="font-medium text-2xl text-black/55">{error.message}</p>
    //     <Button
    //       onClick={() => router.replace("/")}
    //       className="bg-[#00b09c] text-[#e5e5dd] text-md font-semibold my-5 max-w-32"
    //     >
    //       Go Back
    //     </Button>
    //   </div>

    //   <div className="h-full">
    //     <Image alt="error-image" src="/images/error.jpg" className="h-full" />
    //   </div>
    // </div>

    <div className="h-screen flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <Image
          alt="error-image"
          src="/images/error.jpg"
          width={400}
          height={300}
        />
        <h2 className="text-[#606060] font-bold tracking-wider text-4xl">
          Oops! Something went wrong.
        </h2>
        <p className="text-black/55 font-medium text-xl">
          We&#39;re sorry, but there was an error XXX{" "}
          <span className="">{error.message}.</span> Please try again.
        </p>
        <div className="flex flex-row gap-2 items-center">
          <Button
            onClick={() => router.refresh()}
            className="bg-[#06d096] text-[#ffffff] text-md font-semibold my-5 max-w-32"
          >
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
