import fetchHandler from "@utils/fetchHandler";

export default async function getTransactions() {
  const endpoint = "/api/admin/transactions";

  try {
    const transactionsData = await fetchHandler(endpoint);

    return transactionsData;
  } catch (error) {
    console.error("An error occurred while fetching transactions data:", error);
    throw error;
  }
}
