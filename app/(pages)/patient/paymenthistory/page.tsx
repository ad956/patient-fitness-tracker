import { PaymentDetails } from "../components";
import { getPayments } from "@lib/patient";

export default async function Transactions() {
  const response = await getPayments();

  return (
    <section className="md:h-full md:w-full flex flex-col gap-5 items-center p-5 overflow-hidden">
      <p className="self-start font-medium text-lg tracking-wider ml-5">
        Payment History
      </p>
      <PaymentDetails paymentHistory={response} />
    </section>
  );
}
