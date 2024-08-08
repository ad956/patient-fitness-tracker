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

export type bookedAppointments = [
  {
    _id: string;
    timing: string;
    state: string;
    city: string;
    hospital: {
      id: string;
      name: string;
    };
    disease: string;
    note: string;
    approved: string;
    patient_id: string;
    doctor_id: string;
    receptionist_id: string;
    doctor: {
      name: string;
      profile: string;
      specialty: string;
    };
    createdAt: string;
    updatedAt: string;
  }
];

export type bookingAppointment = {
  state: string;
  city: string;
  hospital: {
    hospital_id: string;
    hospital_name: string;
  };
  disease: string;
  note: string;
};

export interface PaymentHistory {
  hospital: {
    name: string;
    profile: string;
  };
  disease: string;
  description: string;
  amount: number;
  status: string;
  createdAt: string;
}
export interface MedicalHistory {
  hospital: {
    name: string;
    profile: string;
  };
  doctor: {
    name: string;
    profile: string;
  };
  start_date: string;
  end_date: string;
  TreatmentStatus: "Completed" | "Ongoing";
  disease: string;
}

// Type for patient details, used by the receptionist to view and manage patient information.
export type PatientDetails = User & {
  disease: string;
  note: string;
  date: string;
  timing: string; // createdAt
};

export interface UserLog {
  username: string;
  name: string;
  email: string;
  action: string;
  userType: string;
  device: string;
  ip: string;
  location: string;
}

export interface Transaction {
  transaction_id: string | null;
  patient_id: string;
  hospital_id: string;
  disease: string;
  description: string;
  amount: string;
  status: string;
}

// admin side for transaction details
type TransactionDetails = {
  transaction_id: string;
  patient: {
    name: string;
    profile: string;
  };
  hospital: {
    name: string;
    profile: string;
  };
  disease: string;
  description: string;
  amount: number;
  status: "Success" | "Failed";
  date: string;
};
