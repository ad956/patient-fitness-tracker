export type bookedAppointments = [
  {
    _id: string;
    timing: {
      startTime: string;
      endTime: string;
    };
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

export type BookAppointmentHospital = {
  hospital_id: string;
  hospital_name: string;
  appointment_charge: string;
};

export type BookAppointmentProps = {
  patientId: string;
  name: string;
  email: string;
};

export type MedicalDetailsProps = {
  medicalDetails: MedicalHistory[];
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

export type BookingAppointmentType = bookingAppointment & {
  transaction_id: string | null;
  appointment_charge: string;
};

export type Payment = {
  hospital: {
    name: string;
    profile: string;
  };
  disease: string;
  description: string;
  date: string;
  amount: number;
  status: "Success" | "Failed";
};

export type PaymentDetailsProps = {
  paymentHistory: Payment[];
};

export interface PendingBill {
  id: string;
  date: string;
  service: string;
  amount: number;
}

export interface DoctorChat {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
  status: "online" | "offline";
  lastMessage: string;
  lastMessageTime: string;
}

export interface LabResult {
  id: string;
  test: string;
  date: string;
  status: "Completed" | "Pending" | "Processing";
  result: string;
}

export type PatientTabsKey = "bills" | "doctors" | "lab";
