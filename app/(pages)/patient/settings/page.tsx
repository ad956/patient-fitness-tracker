import { Patient } from "@/types";
import { getPatientData } from "@lib/patient";
import { ProfileSettings } from "../components";

export default async function Settings() {
  const patient: Patient = await getPatientData();

  return (
    <section className="h-full w-full flex flex-col">
      <ProfileSettings patient={patient} />
    </section>
  );
}
