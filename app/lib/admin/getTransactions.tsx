"use server";
import { getSessionToken } from "../sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

export default async function getTransactions() {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = {
    Authorization: `Bearer ${session}`,
  };
  try {
    const res = await fetch(`${serverUrl}/api/admin/transactions`, {
      headers,
      //   cache: "no-cache",
    });

    if (!res.ok) {
      console.error(`Error fetching transactions data: ${res.statusText}`);
      throw new Error("fetching transactions data");
    }

    const transactionsData = await res.json();

    return transactionsData;
  } catch (error) {
    console.error("An error occurred while fetching transactions data:", error);
    throw error;
  }
}
