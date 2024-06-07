import { PaymentDetails } from "../components";
import { getPaymentsHistory } from "@lib/patient";

export default async function Transactions() {
  const response = await getPaymentsHistory();

  return (
    <section className="md:h-full md:w-full flex flex-col gap-5 items-center p-5 scrollbar overflow-y-scroll">
      <p className="self-start font-medium text-lg tracking-wider ml-5">
        Payment History
      </p>
      <PaymentDetails paymentHistory={response} />
    </section>
  );
}
