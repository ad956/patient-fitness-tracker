import {
  Card,
  Avatar,
  Divider,
  Progress,
  Tooltip,
  Image,
} from "@nextui-org/react";
import React from "react";
import Calendar from "../patient/components/Calendar";
import { FcCloseUpMode } from "react-icons/fc";
import {
  BsFillPersonPlusFill,
  BsPersonBoundingBox,
  BsPersonCheckFill,
  BsPersonLinesFill,
} from "react-icons/bs";
import { Receptionist } from "@/types";
import { getReceptionistData } from "@/lib/receptionist/getReceptionistData";
import { getSession } from "@/lib/sessions/sessionUtils";

export default async function ReceptionistPage() {
  // const { receptionist }: { receptionist: Receptionist } =
  //   await getReceptionistData();

  const data = await getSession();
  console.log(data.user);

  return (
    <section className="bg-[#f3f6fd] overflow-hidden p-2">
      <div className="grid grid-cols-5 grid-rows-5 h-full gap-3">
        <Card className="row-span-2 col-span-2 flex flex-col justify-evenly items-center p-5">
          <p className="text-sm font-semibold self-start">Statistics</p>
          <div className="flex flex-row justify-between items-center w-4/5">
            <div className="flex flex-col justify-center items-start gap-5 border2 border-orange-500">
              <div className="flex flex-row justify-center items-center gap-2">
                <BsPersonLinesFill
                  size={30}
                  fill="#fff"
                  className="bg-black rounded-full p-2"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-bold">34 Patients</p>
                  <p className="text-xs text-black/80">In the last 30 days</p>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-2">
                <BsFillPersonPlusFill
                  size={30}
                  fill="#fff"
                  className="bg-black rounded-full p-2"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-bold">14 Patients</p>
                  <p className="text-xs text-black/80">In the last 7 days</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-5 border2 border-green-700">
              <div className="flex flex-row justify-center items-center gap-2">
                <BsPersonCheckFill
                  size={30}
                  fill="#fff"
                  className="bg-black rounded-full p-2"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-bold">10 Done</p>
                  <p className="text-xs text-black/80">In the last 7 days</p>
                </div>
              </div>

              <div className="flex flex-row justify-center items-center gap-2">
                <BsPersonBoundingBox
                  size={30}
                  fill="#fff"
                  className="bg-black rounded-full p-2"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-bold">4 New</p>
                  <p className="text-xs text-black/80">Waiting for approval</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="col-span-1 flex justify-center gap-5 items-center p-5">
          <Progress
            size="sm"
            radius="sm"
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md border border-default",
              indicator: "bg-gradient-to-r from-yellow-500 to-pink-500",
              label: "tracking-wider font-bold text-xs",
              value: "text-foreground/60 text-xs",
            }}
            label="General Health"
            value={56}
            // value={patient.progress.generalHealth}
            showValueLabel={true}
          />
          <Progress
            size="sm"
            radius="sm"
            color="secondary"
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md border border-default",

              label: "tracking-wider font-bold text-xs",
              value: "text-foreground/60 text-xs",
            }}
            label="Water Balance"
            value={87}
            // value={patient.progress.waterBalance}
            showValueLabel={true}
          />
        </Card>
        <Card className="col-span-1 flex justify-center gap-5 items-center p-5">
          <Progress
            size="sm"
            radius="sm"
            color="success"
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md border border-default",
              label: "tracking-wider font-bold text-xs",
              value: "text-foreground/60 text-xs",
            }}
            label="Current Treatment"
            value={96}
            // value={patient.progress.currentTreatment}
            showValueLabel={true}
          />
          <Tooltip
            showArrow={true}
            placement="right-end"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Tip</div>
                <div className="text-tiny">Each 10 % equals 1 appointment</div>
              </div>
            }
          >
            <Progress
              size="sm"
              radius="sm"
              color="warning"
              classNames={{
                base: "max-w-md",
                track: "drop-shadow-md border border-default",
                label: "tracking-wider font-bold text-xs",
                value: "text-foreground/60 text-xs",
              }}
              label="Pending Appointments"
              value={77}
              // value={patient.progress.pendingAppointments}
              showValueLabel={true}
            />
          </Tooltip>
        </Card>
        <Card className=" row-span-5 col-span-2 flex flex-col justify-center items-center p-5 w-full">
          {/* <Calendar upcomingAppointments={upcomingAppointments} /> */}
          {/* <CarouselService /> */}
        </Card>
        <Card className="col-span-2 row-span-2 flex flex-col justify-center items-center">
          <p className="text-sm font-semibold self-start ml-4 pt-2">
            Your Activity
          </p>
          {/* <WeeklyProgress progressData={patient.activity} /> */}
        </Card>
        <Card className="row-span-2 col-span-3">
          {/* <HealthConditions progressData={patient.healthConditions} /> */}
        </Card>
      </div>
    </section>
  );
}
