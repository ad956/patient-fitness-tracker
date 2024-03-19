export type User = {
  id: number;
  name: string;
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
  upcomingAppointments: [
    {
      day: number;
      month: string;
      year: number;
    }
  ];
};
