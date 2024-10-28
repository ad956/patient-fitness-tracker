import { Image, Avatar } from "@nextui-org/react";
import toast from "react-hot-toast";
import { PendingBill } from "@pft-types/patient";
import SpinnerLoader from "@components/SpinnerLoader";
import { motion } from "framer-motion";
import { getFormattedDate } from "@utils/getDate";
import { BiChevronRight } from "react-icons/bi";
import processPayment from "@lib/razorpay/processPayment";
import { getPendingBills, savePendingBillTransaction } from "@lib/patient";
import useQuery from "@hooks/useQuery";
import { LiaRedoAltSolid } from "react-icons/lia";

interface PendingBillProps {
  patient: {
    name: string;
    email: string;
    contact: string;
  };
}

const PendingBills = ({ patient }: PendingBillProps) => {
  const {
    data: bills,
    isLoading,
    error,
    refetch,
  } = useQuery<PendingBill[]>(getPendingBills, []);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error || !bills?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex justify-center items-center h-full w-full p-4 text-default-600"
      >
        <Image
          src="/images/no_pending_bills.png"
          width={200}
          height={100}
          alt="no-pending-bills"
        />

        {error ? (
          <div className="ml-4 flex items-center gap-1">
            <p className="text-md font-medium text-red-500">{error}</p>
            <LiaRedoAltSolid
              className="cursor-pointer h-5 w-5 text-red-500 hover:text-red-600"
              onClick={refetch}
            />
          </div>
        ) : (
          <div className="ml-4 flex items-center gap-1">
            <p className="text-md font-medium text-gray-500">
              No pending bills found.
            </p>
            <LiaRedoAltSolid
              className="cursor-pointer h-5 w-5 text-gray-500 hover:text-gray-600"
              onClick={refetch}
            />
          </div>
        )}
      </motion.div>
    );
  }

  async function handlePendingBillPayment(bill: PendingBill) {
    try {
      toast.loading("Please wait ...", { duration: 1500 });

      const paymentResult = await processPayment(
        patient.name,
        patient.email,
        `Pending bill payment for ${bill.hospital.name}`,
        bill.amount.toString()
      );

      toast.dismiss();

      const status = paymentResult.success ? "Success" : "Failed";

      if (!paymentResult.success) {
        toast.error(paymentResult.message, {
          duration: 2000,
          position: "bottom-center",
        });
      } else {
        toast.success("Your bill has been paid successfully 💸", {
          id: "payment-success",
          duration: 2000,
          position: "top-center",
        });

        bills?.filter((item) => item !== bill);
      }

      await savePendingBillTransaction(
        bill.txnDocumentId,
        paymentResult.transaction_id,
        status
      );
    } catch (error: any) {
      console.log("Error : " + error.message);
      toast.error(error.message || "Pending Bill Payment Failed !!", {
        position: "top-right",
        duration: 2000,
      });
    }
  }

  return (
    <div className="w-full bg-white rounded-xl p-2 border-2">
      <div className="px-4 py-2 flex justify-between items-center border-b">
        <h2 className="text-sm font-semibold text-gray-700">Recent Bills</h2>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          {bills.length} pending
        </span>
      </div>

      <div
        className={`h-[120px] space-y-1 p-2 ${
          bills.length <= 2 ? "overflow-y-hidden" : "overflow-y-auto scrollbar"
        }`}
      >
        {bills.map((bill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
            onClick={() => handlePendingBillPayment(bill)}
          >
            {/* left: hospital info */}
            <div className="flex items-center gap-3 flex-1">
              <Avatar
                className="w-8 h-8 border-2 border-white shadow-sm"
                src={bill.hospital.profile || "/api/placeholder/32/32"}
                fallback={bill.hospital.name[0]}
              />
              <div>
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {bill.hospital.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {getFormattedDate(new Date(bill.date))}
                </p>
              </div>
            </div>

            {/* right: amount & arrow */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-red-500">
                  ₹{bill.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">Due soon</p>
              </div>
              <BiChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PendingBills;
