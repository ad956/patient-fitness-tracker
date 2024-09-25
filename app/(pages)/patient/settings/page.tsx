import { getPatientData } from "@lib/patient";
import ProfileSettings from "@components/ProfileSettings";

export default async function Settings() {
  const patient = await getPatientData();

  return (
    <section className="h-full w-full flex flex-col overflow-y-auto">
      <ProfileSettings user={patient} />
    </section>
  );
}
