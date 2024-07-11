import ProfileSettings from "@components/profile-settings";
import { getReceptionistData } from "@lib/receptionist";
import { Receptionist } from "@types";

export default async function Settings() {
  const receptionist: Receptionist = await getReceptionistData();

  return (
    <section className="h-full w-full flex flex-col">
      <ProfileSettings user={receptionist} />
    </section>
  );
}
