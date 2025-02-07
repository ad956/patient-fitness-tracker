type User = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  dob: string;
  gender: string;
  contact: string;
  profile: string;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  };
};

type Admin = User & {};

type Patient = User & {
  physicalDetails: {
    age: number;
    blood: string;
    height: number;
    weight: number;
  };
  progress: {
    generalHealth: number;
    waterBalance: number;
    currentTreatment: number;
    pendingAppointments: number;
  };
  medicines: [
    {
      name: string;
      dosage: string;
      frequency: string;
    }
  ];
  healthConditions: number[];
};

type Receptionist = User & {
  dailyCount: {
    approved: number;
    pending: number;
    waiting: number;
  };
};

type Doctor = User & {};
type Hospital = User & {};

// Type for patient details, used by the receptionist to view and manage patient information.
type PatientDetails = User & {
  disease: string;
  note: string;
  date: string;
  timing: string; // createdAt
};

type PersonalInfoBody = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  dob?: string;
  gender?: string;
  contact?: string;
};

type AddressBody = {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
};

type SecurityBody = {
  currentPassword: string;
  newPassword: string;
};

type UserLog = {
  username: string;
  name: string;
  email: string;
  action: string;
  userType: string;
  device: string;
  ip: string;
  location: string;
};
