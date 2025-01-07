"use client";

import { getDoctorData } from "@lib/doctor";
import ChatScreen from "@components/ChatScreen";

export default async function Doctor() {
  const doctor = await getDoctorData();

  return (
    <section className="bg-[#f3f6fd] p-2 overflow-y-auto grid place-items-center">
      <ChatScreen
        currentUser={{
          id: doctor._id,
          firstname: doctor.firstname,
          lastname: doctor.lastname,
          specialty: doctor.gender,
          profile: doctor.profile,
          role: "doctor",
        }}
        chatList={[
          {
            id: "66b5e0aeea614d6d3301c858",
            firstname: "Dr. Alice Johnson",
            lastname: "Dr. Alice Johnson",
            specialty: "Cardiology",
            profile: "https://randomuser.me/api/portraits/women/1.jpg",
            role: "doctor",
          },
          {
            id: "102",
            firstname: "Dr. Mark Smith",
            lastname: "Dr. Mark Smith",
            specialty: "Neurology",
            profile: "https://randomuser.me/api/portraits/men/2.jpg",
            role: "doctor",
          },
          {
            id: "103",
            firstname: "Dr. Emily Davis",
            lastname: "Dr. Emily Davis",
            specialty: "Pediatrics",
            profile: "https://randomuser.me/api/portraits/women/3.jpg",
            role: "doctor",
          },
          {
            id: "104",
            firstname: "Dr. James Brown",
            lastname: "Dr. James Brown",
            specialty: "Orthopedics",
            profile: "https://randomuser.me/api/portraits/men/4.jpg",
            role: "doctor",
          },
          {
            id: "105",
            firstname: "Dr. Olivia Taylor",
            lastname: "Dr. Olivia Taylor",
            specialty: "Dermatology",
            profile: "https://randomuser.me/api/portraits/women/5.jpg",
            role: "doctor",
          },
        ]}
      />
    </section>
  );
}
