import SpinnerLoader from "@/app/components/SpinnerLoader";
import ProfileSettings from "../components/ProfileSettings";

export default function Settings() {
  return (
    <section className="h-full w-full flex flex-col">
      <p className="text-default-800 font-medium tracking-wide text-xl ml-5 mt-5">
        Settings
      </p>

      <SpinnerLoader />

      {/* profile settings to be added */}
      {/* <ProfileSettings /> */}
    </section>
  );
}
