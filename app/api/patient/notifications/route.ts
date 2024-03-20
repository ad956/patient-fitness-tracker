export function GET() {
  const notificationsData = [
    {
      Hospital: "HCG Hospitals",
      Type: "Fever",
      Date: "Mar 19, 2024",
      Amount: 1000,
      Status: "Pending",
      Image:
        "https://media.istockphoto.com/id/1624291952/vector/medical-health-logo-design-illustration.jpg?s=612x612&w=0&k=20&c=RdOq1SRcWwS_12_c5Zg2_QOUz1GD-YwGvfRodtOPN5w=",
    },
  ];

  return Response.json({ notificationsData });
}
