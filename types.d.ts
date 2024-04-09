export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  contact: string;
  profile: string;
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
  activity: number[];
  healthConditions: number[];
};

export type Receptionist = User & {};

export type bookedAppointments = [
  {
    _id: string;
    date: string;
    timing: string;
    state: string;
    city: string;
    hospital: string;
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
