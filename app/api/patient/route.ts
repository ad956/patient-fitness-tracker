import { NextResponse } from "next/server";

export function GET() {
  const patient = {
    id: 1,
    name: "Anand Suthar",
    username: "ad956",
    email: "anandsuthar956@mail.com",
    contact: "917098765469",
    profile: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    physicalDetails: {
      age: 27,
      blood: "O+",
      height: 5.6,
      weight: 60,
    },
    progress: {
      generalHealth: 85,
      waterBalance: 78,
      currentTreatment: 10,
      pendingAppointments: 10,
    },
    activity: [80, 60, 40, 70, 90, 55, 30],
    healthConditions: [40, 70, 90, 60, 50, 80, 95, 45, 85, 70, 88, 75],
    upcomingAppointments: [
      {
        day: 25,
        month: "March",
        year: 2024,
      },
      {
        day: 29,
        month: "March",
        year: 2024,
      },
    ],
  };
  return Response.json({ patient });
}
