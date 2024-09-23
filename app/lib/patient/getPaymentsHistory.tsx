import fetchHandler from "@utils/fetchHandler";

export default async function getPaymentsHistory() {
  const endpoint = "/api/patient/paymenthistory";

  try {
    const paymentsHistory = await fetchHandler(endpoint);

    return paymentsHistory;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}
