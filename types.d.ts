export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  contact: string;
  profile: string;
  dob: string;
};

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
      start_date: string;
      end_date: string;
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

export type bookedAppointments = [
  {
    _id: string;
    date: string;
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
  }
];

export type bookingAppointment = {
  date: Date;
  state: string;
  city: string;
  hospital: {
    hospital_id: string;
    hospital_name: string;
  };
  disease: string;
  note: string;
};

export interface PaymentsHistory {
  hospital: {
    name: string;
    profile: string;
  };
  disease: string;
  description: string;
  date: string;
  amount: number;
  status: string;
}

export interface MedicalHistoryType {
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

export interface PatientDetails {
  patientDetails: any;
  _id: string;
  firstname: string;
  lastname: string;
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
  disease: string;
  note: string;
  date: string;
  timing: string;
}
