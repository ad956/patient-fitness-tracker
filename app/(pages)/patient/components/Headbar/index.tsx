import { CiLogin, CiSearch } from "react-icons/ci";
import { Avatar, Button, Divider, Input, Link, User } from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import { logoutAction } from "@/lib/actions";
import Notifications from "../Notifications";
import { getPatientData } from "@/lib/patient/getPatientData";
import { Patient, bookedAppointments } from "@/types";
import { notFound } from "next/navigation";
import getUpcomingAppointments from "@/lib/patient/getUpcomingAppointments";

export default async function Headbar() {
  const { patient }: { patient: Patient } = await getPatientData();

  if (!patient) {
    return notFound();
  }

  const upcomingAppointments: bookedAppointments =
    await getUpcomingAppointments();

  return (
    <div className="bg-[#f3f6fd] p-4 flex flex-row justify-between mr-5">
      <div className="flex items-center gap-5 w-3/5">
        <p className="text-lg font-semibold tracking-wider">
          Patient Fitness Tracker
        </p>
        <div className="w-2/5">
          <Input
            isClearable
            radius="lg"
            classNames={{
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "bg-white",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <Button
          as={Link}
          isIconOnly
          radius="full"
          variant="shadow"
          size="sm"
          className=" font-bold"
          href={`${process.env.BASE_URL}/patient/appointments`}
        >
          <GoPlus size={20} />
        </Button>

        <Notifications upcomingAppointments={upcomingAppointments} />

        <Divider orientation="vertical" className="h-8 bg-gray-500" />

        <User
          name={patient.firstname}
          avatarProps={{
            src: patient.profile,
          }}
          description={
            <Link
              href={`${process.env.BASE_URL}/patient/settings`}
              color="primary"
              className="text-xs"
            >{`@${patient.username}`}</Link>
          }
        />

        <form action={logoutAction}>
          <Button size="sm" type="submit" isIconOnly className="bg-transparent">
            <CiLogin size={25} />
          </Button>
        </form>
      </div>
    </div>
  );
}
