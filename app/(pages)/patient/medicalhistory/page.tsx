import { getPatientMedicalHistory } from "@/lib/patient";
import MedicalDetails from "../components/MedicalDetails";

export default async function MedicalHistory() {
  const response = await getPatientMedicalHistory();
  if (response.error) {
    throw new Error("failed to fetch payments");
  }

  return (
    <section className="h-full w-full flex flex-col items-center scrollbar overflow-y-scroll">
      <MedicalDetails medicalDetails={response} />
    </section>
  );
}
