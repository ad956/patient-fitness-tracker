import { getPatientMedicalHistory } from "@/lib/patient";
import MedicalDetails from "../components/MedicalDetails";
import ErrorPage from "@components/errorpage";

export default async function MedicalHistory() {
  const response = await getPatientMedicalHistory();
  if (response.error) {
    ErrorPage("failed to fetch payments");
  }

  return (
    <section className="h-full w-full flex flex-col items-center overflow-y-scroll">
      <MedicalDetails medicalDetails={response} />
    </section>
  );
}
