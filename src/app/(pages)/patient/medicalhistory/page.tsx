import { getPatientMedicalHistory } from "@lib/patient";
import { MedicalDetails } from "../components";

export default async function MedicalHistory() {
  const response = await getPatientMedicalHistory();

  return (
    <section className="md:h-full md:w-full flex flex-col items-center scrollbar overflow-y-scroll">
      <MedicalDetails medicalDetails={response} />
    </section>
  );
}
