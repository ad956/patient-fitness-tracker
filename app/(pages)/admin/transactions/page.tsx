import { TransactionDetails } from "@types";
import Transactions from "../components/Transactions";
import getTransactions from "@lib/admin/getTransactions";

export default async function TransactionsPage() {
  const transactions: TransactionDetails[] = await getTransactions();

  return <Transactions transactions={transactions} />;
}
