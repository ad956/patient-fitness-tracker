"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";
import { LabResult } from "@pft-types/patient";

export default async function getLabResults(): Promise<LabResult[]> {
  const endpoint = "/api/patient/paymenthistory?status=pending";
  const session = getSessionToken();

  try {
    // const response = await fetchHandler<LabResult[]>(
    //   endpoint,
    //   {
    //     cache: "no-cache",
    //   },
    //   session!
    // );
    // if (response.error) {
    //   throw new Error(response.error.message);
    // }
    // return response.data!;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return labResults;
  } catch (error) {
    console.error(
      "An error occurred while fetching lab results for patient : ",
      error
    );
    throw error;
  }
}

const labResults: LabResult[] = [
  {
    id: "LR-001",
    test: "Complete Blood Count",
    date: "2024-10-14",
    status: "Completed",
    result: "Normal",
  },
  {
    id: "LR-002",
    test: "Lipid Profile",
    date: "2024-10-15",
    status: "Pending",
    result: "Awaiting",
  },
  {
    id: "LR-003",
    test: "Thyroid Function",
    date: "2024-10-16",
    status: "Processing",
    result: "In Progress",
  },
];
