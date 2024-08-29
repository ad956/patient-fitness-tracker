export type ActivityType =
  | "New Patient Registered"
  | "New Doctor Registered"
  | "New Hospital Registered"
  | "New Receptionist Registered";

export type TilesDataProp = {
  totalHospitals: string;
  totalPatients: string;
  totalDoctors: string;
  totalReceptionists: string;
};

export type RecentUser = {
  title: ActivityType;
  description: string;
  timeSince: string;
};

export type PaginatedResponse = {
  users: RecentUser[];
  page: number;
  totalPages: number;
  totalItems: number;
};

export type TransactionDetails = {
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
