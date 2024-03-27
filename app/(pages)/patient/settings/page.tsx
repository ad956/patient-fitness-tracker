import SpinnerLoader from "@/app/components/SpinnerLoader";
import ProfileSettings from "../components/ProfileSettings";

export default function Settings() {
  return (
    <section className="h-full w-full flex flex-col">
      <p className="self-start font-medium text-lg tracking-wider ml-5">
        Settings
      </p>

      {/* <SpinnerLoader /> */}

      {/* profile settings to be added */}
      <ProfileSettings />
    </section>
  );
}
