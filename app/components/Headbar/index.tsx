import Link from "next/link";
import { Button, Divider, User } from "@nextui-org/react";
import { CiLogin } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { User as UserType } from "@pft-types/index";
import { logoutAction } from "@lib/actions";
import Notifications from "../Notifications";

type HeadbarProps = {
  user: UserType;
  role: string;
};

const USERS_WITH_ADD_BUTTON = ["patient", "receptionist"];

export default async function Headbar({ user, role }: HeadbarProps) {
  return (
    <div className="bg-[#f3f6fd] p-4 flex flex-row justify-between">
      <div className="flex items-center w-3/5">
        <p className="hidden ml-2 md:-ml-2 text-sm md:flex md:text-lg font-semibold tracking-wider">
          Patient Fitness Tracker
        </p>
      </div>

      <div className="flex justify-center items-center gap-2">
        {USERS_WITH_ADD_BUTTON.includes(role) ?? (
          <Button
            as={Link}
            isIconOnly
            radius="full"
            variant="shadow"
            size="sm"
            className=""
            href={`/${role}/appointments`}
          >
            <GoPlus size={20} />
          </Button>
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
