import Transactions from "../components/Transactions";
import getTransactions from "@lib/admin/get-transactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return <Transactions transactions={transactions} />;
}
