import { PaymentDetails } from "../components";
import { getPaymentsHistory } from "@lib/patient";

export default async function PaymentHistory() {
  const response = await getPaymentsHistory();

  return (
    <section className="md:h-full md:w-full flex flex-col gap-5 items-center overflow-hidden">
      <PaymentDetails paymentHistory={response} />
    </section>
  );
}
