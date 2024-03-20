export function GET() {
  const hospitalsData = [
    {
      Hospital: "HCG Hospitals",
      Doctor: "Dr. Smith",
      StartDate: "Mar 10, 2024",
      EndDate: "Mar 19, 2024",
      TreatmentStatus: "Ongoing",
      Disease: "Fever",
      Image:
        "https://media.istockphoto.com/id/1624291952/vector/medical-health-logo-design-illustration.jpg?s=612x612&w=0&k=20&c=RdOq1SRcWwS_12_c5Zg2_QOUz1GD-YwGvfRodtOPN5w=",
    },
    {
      Hospital: "Nishtha Hospital",
      Doctor: "Dr. Johnson",
      StartDate: "Mar 5, 2024",
      EndDate: "Mar 15, 2024",
      TreatmentStatus: "Ongoing",
      Disease: "Injury",
      Image:
        "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710892800&semt=ais",
    },
    {
      Hospital: "Zenith Hospital",
      Doctor: "Dr. Anderson",
      StartDate: "Jan 26, 2024",
      EndDate: "Feb 5, 2024",
      TreatmentStatus: "Completed",
      Disease: "Injury",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "Arihant Hospital",
      Doctor: "Dr. Brown",
      StartDate: "Jan 24, 2024",
      EndDate: "Feb 1, 2024",
      TreatmentStatus: "Completed",
      Disease: "Heart Disease",
      Image:
        "https://thumbs.dreamstime.com/b/hospital-logo-icon-hospital-logo-icon-135146804.jpg",
    },
    {
      Hospital: "Pearl Hospital",
      Doctor: "Dr. White",
      StartDate: "Jan 10, 2024",
      EndDate: "Jan 20, 2024",
      TreatmentStatus: "Completed",
      Disease: "Diabetes",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "HCG Hospitals",
      Doctor: "Dr. Smith",
      StartDate: "Jan 5, 2024",
      EndDate: "Jan 15, 2024",
      TreatmentStatus: "Completed",
      Disease: "Injury",
      Image:
        "https://media.istockphoto.com/id/1624291952/vector/medical-health-logo-design-illustration.jpg?s=612x612&w=0&k=20&c=RdOq1SRcWwS_12_c5Zg2_QOUz1GD-YwGvfRodtOPN5w=",
    },
    {
      Hospital: "Nishtha Hospital",
      Doctor: "Dr. Johnson",
      StartDate: "Dec 3, 2023",
      EndDate: "Dec 10, 2023",
      TreatmentStatus: "Completed",
      Disease: "Fever",
      Image:
        "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710892800&semt=ais",
    },
    {
      Hospital: "Zenith Hospital",
      Doctor: "Dr. Anderson",
      StartDate: "Nov 25, 2023",
      EndDate: "Dec 5, 2023",
      TreatmentStatus: "Completed",
      Disease: "Diabetes",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "Arihant Hospital",
      Doctor: "Dr. Brown",
      StartDate: "Nov 20, 2023",
      EndDate: "Nov 30, 2023",
      TreatmentStatus: "Completed",
      Disease: "Injury",
      Image:
        "https://thumbs.dreamstime.com/b/hospital-logo-icon-hospital-logo-icon-135146804.jpg",
    },
    {
      Hospital: "Pearl Hospital",
      Doctor: "Dr. White",
      StartDate: "Nov 15, 2023",
      EndDate: "Nov 25, 2023",
      TreatmentStatus: "Completed",
      Disease: "Heart Disease",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "HCG Hospitals",
      Doctor: "Dr. Smith",
      StartDate: "Oct 13, 2023",
      EndDate: "Oct 20, 2023",
      TreatmentStatus: "Completed",
      Disease: "Diabetes",
      Image:
        "https://media.istockphoto.com/id/1624291952/vector/medical-health-logo-design-illustration.jpg?s=612x612&w=0&k=20&c=RdOq1SRcWwS_12_c5Zg2_QOUz1GD-YwGvfRodtOPN5w=",
    },
    {
      Hospital: "Nishtha Hospital",
      Doctor: "Dr. Johnson",
      StartDate: "Sep 5, 2023",
      EndDate: "Sep 15, 2023",
      TreatmentStatus: "Completed",
      Disease: "Heart Disease",
      Image:
        "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710892800&semt=ais",
    },
    {
      Hospital: "Zenith Hospital",
      Doctor: "Dr. Anderson",
      StartDate: "Jul 26, 2023",
      EndDate: "Aug 5, 2023",
      TreatmentStatus: "Completed",
      Disease: "Injury",
      Image:
        "https://marketplace.canva.com/EAFBb6P4OLs/1/0/1600w/canva-red-blue-simple-logo-hbl5vlZh180.jpg",
    },
    {
      Hospital: "Arihant Hospital",
      Doctor: "Dr. Brown",
      StartDate: "Jun 21, 2023",
      EndDate: "Jul 1, 2023",
      TreatmentStatus: "Completed",
      Disease: "Diabetes",
      Image:
        "https://thumbs.dreamstime.com/b/hospital-logo-icon-hospital-logo-icon-135146804.jpg",
    },
  ];

  return Response.json({ hospitalsData });
}
