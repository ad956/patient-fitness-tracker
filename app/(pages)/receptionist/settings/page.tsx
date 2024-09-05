import ProfileSettings from "@components/ProfileSettings";
import { getReceptionistData } from "@lib/receptionist";
import { Receptionist } from "@pft-types/index";

export default async function Settings() {
  const receptionist: Receptionist = await getReceptionistData();

  return (
    <section className="h-full w-full flex flex-col overflow-y-auto">
      <ProfileSettings user={receptionist} />
    </section>
  );
}
