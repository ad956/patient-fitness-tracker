import { Admin } from "@types";
import getAdminData from "@lib/admin/getAdminData";
import ProfileSettings from "@components/ProfileSettings";

export default async function Settings() {
  const admin: Admin = await getAdminData();

  return (
    <section className="h-screen w-full flex flex-col">
      <ProfileSettings user={admin} />
    </section>
  );
}
