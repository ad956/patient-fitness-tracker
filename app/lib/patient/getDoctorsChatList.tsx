"use server";

import fetchHandler from "@utils/fetchHandler";
import { getSessionToken } from "../sessions/sessionUtils";
import { DoctorChat } from "@pft-types/patient";

export default async function getDoctorsChatList(): Promise<DoctorChat[]> {
  const endpoint = "/api/patient/paymenthistory?status=pending";
  const session = getSessionToken();

  try {
    // const response = await fetchHandler<[DoctorChat]>(
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
    return MOCK_DOCTORS;
  } catch (error) {
    console.error(
      "An error occurred while fetching doctor's chat list for patient: ",
      error
    );
    throw error;
  }
}

// mock data - will remove soon
const MOCK_DOCTORS: DoctorChat[] = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    avatar:
      "https://www.sketchappsources.com/resources/source-image/doctor-illustration-hamamzai.png",
    status: "online",
    lastMessage: "Your heart readings look normal. Keep up the good work!",
    lastMessageTime: "10:30 AM",
  },
  {
    id: 2,
    name: "Dr. James Miller",
    specialty: "Neurologist",
    avatar:
      "https://images.apollo247.in/doctors/noimagefemale.png?tr=q-80,f-auto,w-100,dpr-2.5,c-at_max%20250w",
    status: "offline",
    lastMessage: "We'll discuss your test results in our next appointment.",
    lastMessageTime: "Yesterday",
  },
  {
    id: 3,
    name: "Dr. Emma Thompson",
    specialty: "Dermatologist",
    avatar:
      "https://www.sketchappsources.com/resources/source-image/doctor-illustration-hamamzai.png",
    status: "online",
    lastMessage: "Remember to apply the prescribed cream twice daily.",
    lastMessageTime: "2:15 PM",
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    avatar:
      "https://images.apollo247.in/doctors/noimagefemale.png?tr=q-80,f-auto,w-100,dpr-2.5,c-at_max%20250w",
    status: "online",
    lastMessage: "The vaccination schedule looks good.",
    lastMessageTime: "11:45 AM",
  },
];
