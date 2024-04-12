import { getSessionToken } from "@sessions/sessionUtils";

export default async function getPatientMedicalHistory() {
  const session = await getSessionToken();

  const headers = {
    Authorization: `Bearer ${session}`,
  };

  const response = await fetch(
    "http://localhost:3000/api/patient/medicalhistory",
    {
      headers,
    }
  );

  const res = await response.json();
  return res;
}
