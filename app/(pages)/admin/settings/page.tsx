import { Patient } from "@types";
import { getPatientData } from "@lib/patient";
import ProfileSettings from "@components/ProfileSettings";

export default async function Settings() {
  // const patient: Patient = await getPatientData();
  const admin = {
    _id: "1",
    firstname: "Admin",
    lastname: "Kumar",
    username: "admin",
    email: "admin@exmaple.com",
    dob: "1996-05-16",
    gender: "Male",
    contact: "7097654537",
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWLkd22f1fiO-xt_Jcu1I3Bq56Gu4mNdWPg&s",
    address: {
      address_line_1: "F 310 Wisteria Heights",
      address_line_2: "Waghodia Daboi Ring Road",
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      zip_code: "390025",
    },
  };

  return (
    <section className="h-screen w-full flex flex-col">
      <ProfileSettings user={admin} />
    </section>
  );
}
