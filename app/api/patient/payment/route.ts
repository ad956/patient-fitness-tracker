export function GET() {
  const paymentData = [
    {
      Hospital: "HCG Hospitals",
      Type: "Fever",
      Date: "Mar 19, 2024",
      Amount: 1000,
      Status: "Pending",
      Image:
        "https://media.istockphoto.com/id/1624291952/vector/medical-health-logo-design-illustration.jpg?s=612x612&w=0&k=20&c=RdOq1SRcWwS_12_c5Zg2_QOUz1GD-YwGvfRodtOPN5w=",
    },
    {
      Hospital: "Nishtha Hospital",
      Type: "Injury",
      Date: "Mar 15, 2024",
      Amount: 5000,
      Status: "Pending",
      Image:
        "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710892800&semt=ais",
    },
    {
      Hospital: "Zenith Hospital",
      Type: "Injury",
      Date: "Feb 5, 2024",
      Amount: 2500,
      Status: "Completed",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "Arihant Hospital",
      Type: "Heart Disease",
      Date: "Feb 1, 2024",
      Amount: 8000,
      Status: "Completed",
      Image:
        "https://thumbs.dreamstime.com/b/hospital-logo-icon-hospital-logo-icon-135146804.jpg",
    },
    {
      Hospital: "Pearl Hospital",
      Type: "Diabetes",
      Date: "Jan 20, 2024",
      Amount: 3000,
      Status: "Completed",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "HCG Hospitals",
      Type: "Injury",
      Date: "Jan 15, 2024",
      Amount: 1500,
      Status: "Completed",
      Image:
        "https://media.istockphoto.com/id/1624291952/vector/medical-health-logo-design-illustration.jpg?s=612x612&w=0&k=20&c=RdOq1SRcWwS_12_c5Zg2_QOUz1GD-YwGvfRodtOPN5w=",
    },
    {
      Hospital: "Nishtha Hospital",
      Type: "Fever",
      Date: "Dec 10, 2023",
      Amount: 2000,
      Status: "Completed",
      Image:
        "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710892800&semt=ais",
    },
    {
      Hospital: "Zenith Hospital",
      Type: "Diabetes",
      Date: "Dec 5, 2023",
      Amount: 3500,
      Status: "Completed",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "Arihant Hospital",
      Type: "Injury",
      Date: "Nov 30, 2023",
      Amount: 2200,
      Status: "Completed",
      Image:
        "https://thumbs.dreamstime.com/b/hospital-logo-icon-hospital-logo-icon-135146804.jpg",
    },
    {
      Hospital: "Pearl Hospital",
      Type: "Heart Disease",
      Date: "Nov 25, 2023",
      Amount: 6500,
      Status: "Completed",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "HCG Hospitals",
      Type: "Diabetes",
      Date: "Oct 20, 2023",
      Amount: 1800,
      Status: "Completed",
      Image:
        "https://media.istockphoto.com/id/1624291952/vector/medical-health-logo-design-illustration.jpg?s=612x612&w=0&k=20&c=RdOq1SRcWwS_12_c5Zg2_QOUz1GD-YwGvfRodtOPN5w=",
    },
    {
      Hospital: "Nishtha Hospital",
      Type: "Heart Disease",
      Date: "Sep 15, 2023",
      Amount: 7000,
      Status: "Completed",
      Image:
        "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710892800&semt=ais",
    },
    {
      Hospital: "Zenith Hospital",
      Type: "Injury",
      Date: "Aug 5, 2023",
      Amount: 2900,
      Status: "Completed",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "Arihant Hospital",
      Type: "Diabetes",
      Date: "Jul 1, 2023",
      Amount: 4000,
      Status: "Completed",
      Image:
        "https://thumbs.dreamstime.com/b/hospital-logo-icon-hospital-logo-icon-135146804.jpg",
    },
  ];

  return Response.json({ paymentData });
}
