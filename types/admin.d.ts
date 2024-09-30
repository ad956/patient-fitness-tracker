export type ActivityType =
  | "New Patient Registered"
  | "New Doctor Registered"
  | "New Hospital Registered"
  | "New Receptionist Registered";

type StatisticTile = {
  count: number;
  change: number;
};

export type TilesDataType = {
  newHospitals: StatisticTile;
  newPatients: StatisticTile;
  newDoctors: StatisticTile;
  newReceptionists: StatisticTile;
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

export interface HospitalDetails {
  id: string;
  profile: string;
  name: string;
  username: string;
  contact: string;
  city: string;
  state: string;
}

export interface UserData {
  id: string;
  name: string;
  role: string;
  username: string;
  profile: string;
  gender: string;
  contact: string;
  city: string;
  state: string;
}

export type HospitalUserDetails = HospitalDetails & {
  role: string;
  gender: string;
};

export type RecentUserTile = {
  firstname: string;
  createdAt: Date;
  type: string;
};

export type FormattedRecentUser = {
  title: string;
  description: string;
  timeSince: string;
};

export type RecentUserPaginatedResponse = {
  users: FormattedUser[];
  page: number;
  totalPages: number;
  totalItems: number;
};

// for /hospitals
interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
