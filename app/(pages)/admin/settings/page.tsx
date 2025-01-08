import getAdminData from "@lib/admin/get-admin-data";
import ProfileSettings from "@components/ProfileSettings";

export default async function Settings() {
  const admin = await getAdminData();

  return (
    <section className="h-screen w-full flex flex-col">
      <ProfileSettings user={admin} />
    </section>
  );
}
