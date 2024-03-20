import React from "react";
import Payments from "../components/payments";

export default function Transactions() {
  return (
    <section className="h-full w-full flex flex-col gap-5 items-center p-5 overflow-hidden">
      <p className="self-start font-medium text-lg tracking-wider ml-5">
        Payment History
      </p>
      <Payments />
    </section>
  );
}
