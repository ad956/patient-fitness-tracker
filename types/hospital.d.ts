type HospitalDetailsType = {
  hospitalId: string;
  staff: [
    {
      firstName: string;
      lastName: string;
      profile: string;
      role: string;
      contact: string;
    }
  ];
  additionalInfo: {
    totalStaffCount: number;
    averageStaffExperience: number;
    servicesOffered: [string];
    equipmentAvailable: [string];
    operationalHours: string;
    emergencyContact: string;
  };
  hospitalStatus: {
    totalPatients: number;
    totalDoctors: number;
    totalStaff: number;
    emergencyCases: number;
    availableBeds: number;
  };
};
