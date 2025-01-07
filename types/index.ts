export type User = {
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

export type Admin = User & {};

export type Patient = User & {
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

export type Receptionist = User & {
  dailyCount: {
    approved: number;
    pending: number;
    waiting: number;
  };
};

export type Doctor = User & {};
export type Hospital = User & {};

// Type for patient details, used by the receptionist to view and manage patient information.
export type PatientDetails = User & {
  disease: string;
  note: string;
  date: string;
  timing: string; // createdAt
};

export type PersonalInfoBody = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  dob?: string;
  gender?: string;
  contact?: string;
};

export type AddressBody = {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
};

export type SecurityBody = {
  currentPassword: string;
  newPassword: string;
};

export interface ChatProps {
  currentUser: {
    id: string;
    role: "patient" | "doctor";
    firstname: string;
    lastname: string;
    profile?: string;
  };
  chatList: Array<{
    id: string;
    role: "patient" | "doctor";
    firstname: string;
    lastname: string;
    profile?: string;
  }>;
}

export * from "./admin";
export * from "./patient";
export * from "./receptionist";
