import { PaymentDeatils } from "../components";
import { getPayments } from "@lib/patient";

export default async function Transactions() {
  const response = await getPayments();

  return (
    <section className="h-full w-full flex flex-col gap-5 items-center p-5 overflow-hidden">
      <p className="self-start font-medium text-lg tracking-wider ml-5">
        Payment History
      </p>
      <PaymentDeatils paymentHistory={response} />
    </section>
  );
}
