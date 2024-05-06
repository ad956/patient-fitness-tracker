import { Receptionist } from "@/types";
import { Input, Button, Card, Avatar } from "@nextui-org/react";
import { getReceptionistData } from "@lib/receptionist";

export default async function ProfileSettings() {
  const receptionist: Receptionist = await getReceptionistData();

  return (
    <Card
      radius="lg"
      shadow="lg"
      className="flex flex-col gap-5 items-center p-5 h-full w-full"
    >
      <p className="self-start font-bold text-md tracking-wider">
        Profile Settings
      </p>

      <div className="flex flex-row justify-around gap-5 p-5 items-center h-full w-full ">
        <div className="relative">
          <Avatar src={receptionist.profile} className="w-48 h-48 text-large" />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="First Name"
            value={receptionist.firstname}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Username"
            value={receptionist.username}
            className="max-w-xs"
          />
          <Input
            type="email"
            variant="underlined"
            label="Email address"
            value={receptionist.email}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="DOB"
            value={receptionist.dob}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="Last Name"
            value={receptionist.lastname}
            className="max-w-xs"
          />
          <Input
            type="password"
            variant="underlined"
            label="Password"
            value={"your_password"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Phone"
            value={receptionist.contact}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Gender"
            value={"Male"}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="Address Line 1"
            value={"A 106 Phoenix Heights"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Address Line 2"
            value={"Waghodia Daboi Ring Road"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="City"
            value={"Vadodara"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="State"
            value={"Gujarat"}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            variant="underlined"
            label="Zip Code"
            value={"390025"}
            className="max-w-xs"
          />
          <Input
            type="text"
            variant="underlined"
            label="Country"
            value={"India"}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-row hfull w-full mt-10 justify-center items-center">
          <Button color="danger" variant="shadow">
            Update Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}
