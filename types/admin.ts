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
