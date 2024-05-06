import { CiLogin } from "react-icons/ci";
import { Button, Divider, Image, User } from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import { logoutAction } from "@lib/actions";
import Notifications from "../Notifications";
import { getPatientData, getUpcomingAppointments } from "@lib/patient";
import { Patient, bookedAppointments } from "@/types";
import Link from "next/link";
import getBaseUrl from "@utils/getBaseUrl";

export default async function Headbar() {
  const patient: Patient = await getPatientData();

  const upcomingAppointments: bookedAppointments =
    await getUpcomingAppointments();

  const serverUrl = getBaseUrl();

  return (
    <div className="bg-[#f3f6fd] p-4 flex flex-row justify-between">
      <div className="flex items-center w-3/5">
        <Image
          src="/patient.svg"
          alt="brand-logo"
          height={35}
          width={35}
          className="flex md:hidden my-1"
        />
        <p className="ml-2 md:-ml-2 text-sm md:flex md:text-lg font-semibold tracking-wider">
          Patient Fitness Tracker
        </p>
      </div>

      <div className="flex justify-center items-center gap-2">
        <Button
          as={Link}
          isIconOnly
          radius="full"
          variant="shadow"
          size="sm"
          className=" font-bold"
          href={`${serverUrl}/patient/appointments`}
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
              href={`${serverUrl}/patient/settings`}
              className="text-xs text-danger"
            >{`@${patient.username}`}</Link>
          }
        />

        <form action={logoutAction} className="hidden md:flex">
          <Button size="sm" type="submit" isIconOnly className="bg-transparent">
            <CiLogin size={25} />
          </Button>
        </form>
      </div>
    </div>
  );
}
