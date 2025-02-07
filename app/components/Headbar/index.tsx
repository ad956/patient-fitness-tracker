import Link from "next/link";
import { Button, Divider, User } from "@nextui-org/react";
import { CiLogin } from "react-icons/ci";
import { logoutAction } from "@lib/actions";
import Notifications from "../Notifications";
import Image from "next/image";

type HeadbarProps = {
  user: User;
  role: string;
};

const USERS_WITH_ADD_BUTTON = ["patient", "receptionist"];

export default async function Headbar({ user, role }: HeadbarProps) {
  return (
    <div className="bg-[#f3f6fd] p-4 flex flex-row justify-between">
      <div className="flex items-center w-3/5">
        <p className="hidden ml-2 md:-ml-2 text-sm md:flex md:text-lg md:mb-3 font-medium tracking-wide">
          Syncure
        </p>
      </div>

      <div className="flex justify-center items-center gap-2">
        {USERS_WITH_ADD_BUTTON.includes(role) && (
          <Link className="" href={`/${role}/appointments`}>
            <Image
              src="/icons/add-appointment.png"
              alt="add-appointment-icon"
              height={35}
              width={35}
            />
          </Link>
        )}
        <Notifications userId={user._id} />
        <Divider orientation="vertical" className="h-8" />

        <User
          name={user.firstname}
          avatarProps={{
            src: user.profile,
          }}
          className=""
          description={
            <Link
              href={`/${role}/settings`}
              className="text-xs text-danger"
            >{`@${user.username}`}</Link>
          }
        />
        <Divider orientation="vertical" className="h-8" />

        <form action={logoutAction} className="">
          <Button size="sm" type="submit" isIconOnly className="bg-transparent">
            <CiLogin size={25} />
          </Button>
        </form>
      </div>
    </div>
  );
}
