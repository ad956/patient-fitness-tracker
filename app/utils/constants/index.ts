const carouselData = [
  {
    image: "/images/reception.png",
    title: "Efficient Patient Management",
    desc: " Receptionist dashboard for streamlined appointment and record management",
  },
  {
    image: "/images/doctor.png",
    title: "Personalized Care Delivery",
    desc: "Doctor interface for tailored treatment plans and patient care.",
  },
  {
    image: "/images/admin.png",
    title: "Comprehensive Admin Tools",
    desc: "Admin dashboard for seamless hospital operations and performance monitoring.",
  },
];

const projectFeatures = [
  {
    title: "Comprehensive Patient Management",
    description:
      "Efficiently manage patient information, appointments, and treatment plans, enhancing coordination and care delivery.",
    icon: "MdOutlineManageAccounts",
  },
  {
    title: "Secure and Accessible Health Records",
    description:
      "Empower patients with secure access to their health records while enabling healthcare providers to retrieve and update information easily.",
    icon: "MdOutlineDocumentScanner",
  },
  {
    title: "QR Code Integration for Instant Access",
    description:
      "Assign unique QR codes to patients for quick access to their complete health records, enhancing efficiency and accuracy in patient care.",
    icon: "MdOutlineQrCodeScanner",
  },
  {
    title: "Real-time Communication and Alerts",
    description:
      "Facilitate real-time communication between patients and healthcare providers, ensuring timely appointment reminders, medication alerts, and notifications.",
    icon: "CiCircleAlert",
  },
];

const roles = [
  { label: "Patient", value: "patient" },
  { label: "Hospital", value: "hospital" },
  { label: "Receptionist", value: "receptionist" },
  { label: "Doctor", value: "doctor" },
];

const commonadditionalDetails = {
  otp: "",
  dob: "1970-01-01",
  gender: "Gender",
  contact: "",
  profile:
    "https://res.cloudinary.com/dtkfvp2ic/image/upload/v1715082439/110505291-heart-shape-illustration-health-medicine-concept-people-running-for-exercise-awareness-or-sport_eyu2iw.jpg",
  address: {
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
  },
  current_hospital: "",
};

const patientadditionalDetails = {
  ...commonadditionalDetails,
  physicalDetails: {
    age: 0,
    blood: "-",
    height: 0.0,
    weight: 0,
  },
  progress: {
    generalHealth: 75,
    waterBalance: 70,
    currentTreatment: 0,
    pendingAppointments: 0,
  },
  healthConditions: Array(12).fill(0),
  medicines: [],
};

const hospitaladditionalDetails = {
  otp: "",
  contact: "",
  profile: "",
  address: {
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
  },
  patients: [],
  doctors: [],
  receptionists: [],
};

const doctoradditionalDetails = {
  patients: [],
  ...commonadditionalDetails,
  specialty: "",
};

const receptionistadditionalDetails = {
  ...commonadditionalDetails,
  dailyCount: {
    approved: 0,
    pending: 0,
    waiting: 0,
  },
};

export {
  carouselData,
  projectFeatures,
  roles,
  patientadditionalDetails,
  hospitaladditionalDetails,
  doctoradditionalDetails,
  receptionistadditionalDetails,
};
