type ActivityType =
  | "New Patient Registered"
  | "New Doctor Registered"
  | "New Hospital Registered"
  | "New Receptionist Registered";

type StatisticTile = {
  count: number;
  change: number;
};

type TilesDataType = {
  newHospitals: StatisticTile;
  newPatients: StatisticTile;
  newDoctors: StatisticTile;
  newReceptionists: StatisticTile;
};

type RecentUser = {
  title: ActivityType;
  description: string;
  timeSince: string;
};

type PaginatedResponse = {
  users: RecentUser[];
  page: number;
  totalPages: number;
  totalItems: number;
};

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

type HospitalDetails = {
  id: string;
  profile: string;
  name: string;
  username: string;
  contact: string;
  city: string;
  state: string;
};

type UserData = {
  id: string;
  name: string;
  role: string;
  username: string;
  profile: string;
  gender: string;
  contact: string;
  city: string;
  state: string;
};

type HospitalUserDetails = HospitalDetails & {
  role: string;
  gender: string;
};

type RecentUserTile = {
  firstname: string;
  createdAt: Date;
  type: string;
};

type FormattedRecentUser = {
  title: string;
  description: string;
  timeSince: string;
};

type RecentUserPaginatedResponse = {
  users: FormattedUser[];
  page: number;
  totalPages: number;
  totalItems: number;
};

type HospitalData = {
  id: string;
  name: string;
  username: string;
  profile: string;
  contact: string;
  city: string;
  state: string;
};

type HospitalUserData = {
  id: string;
  name: string;
  role: string;
  username: string;
  profile: string;
  gender: string;
  contact: string;
  city: string;
  state: string;
};

type PaginationMetadata = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};
