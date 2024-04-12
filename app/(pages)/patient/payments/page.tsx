import React from "react";
import Payments from "../components/Payments";
import { getPayments } from "@/lib/patient";
import ErrorPage from "@components/errorpage";

export default async function Transactions() {
  const response = await getPayments();
  if (response.error) {
    ErrorPage("failed to fetch payments");
  }

  return (
    <section className="h-full w-full flex flex-col gap-5 items-center p-5 overflow-hidden">
      <p className="self-start font-medium text-lg tracking-wider ml-5">
        Payment History
      </p>
      <Payments paymentHistory={response} />
    </section>
  );
}
