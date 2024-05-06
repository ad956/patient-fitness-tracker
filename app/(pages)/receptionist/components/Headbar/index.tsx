import { CiLogin } from "react-icons/ci";
import { Button, Divider, User } from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import { logoutAction } from "@lib/actions";
import Notifications from "../Notifications";
import { Receptionist, bookedAppointments } from "@/types";
import { getUpcomingAppointments } from "@lib/patient";
import { getReceptionistData } from "@lib/receptionist";
import Link from "next/link";
import getBaseUrl from "@utils/getBaseUrl";

export default async function Headbar() {
  const receptionist: Receptionist = await getReceptionistData();

  const upcomingAppointments: bookedAppointments =
    await getUpcomingAppointments();

  const serverUrl = getBaseUrl();

  return (
    <div className="bg-[#f3f6fd] p-4 flex flex-row justify-between">
      <div className="flex items-center gap-5 w-3/5">
        <p className="text-lg font-semibold tracking-wider">
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
          href={`${serverUrl}/receptionist/appointments`}
        >
          <GoPlus size={20} />
        </Button>

        <Notifications upcomingAppointments={upcomingAppointments} />

        <Divider orientation="vertical" className="h-8 bg-gray-500" />

        <User
          name={receptionist.firstname}
          avatarProps={{
            src: receptionist.profile,
          }}
          description={
            <Link
              href={`${serverUrl}/receptionist/settings`}
              className="text-xs text-primary"
            >{`@${receptionist.username}`}</Link>
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
