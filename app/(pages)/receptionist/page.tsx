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
import { WeeklyProgress, MonthlyVisitors } from "./components/Graphs";
import PatientTabs from "./components/PatientTabs";

export default async function ReceptionistPage() {
  // const { receptionist }: { receptionist: Receptionist } =
  //   await getReceptionistData();

  // const data = await getSession();
  // console.log(data.user);

  return (
    <section className="bg-[#f3f6fd] overflow-hidden p-2 h-full">
      <div className="border2 border-rose-600 grid grid-cols-6 grid-rows-5 h-full gap-3">
        <Card className="row-span-2 col-span-2 flex flex-col gap-10 items-center p-5">
          <p className="text-sm font-semibold self-start">Patient Statistics</p>
          <div className="flex flex-row justify-around gap-10 items-center w-full">
            <div className="flex flex-col justify-center items-start gap-5">
              <div className="flex flex-row justify-center items-center gap-2">
                <BsPersonLinesFill
                  size={35}
                  fill="#fff"
                  className="bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full p-2"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-bold">34 Patients</p>
                  <p className="text-xs text-black/80">In the last 30 days</p>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-2">
                <BsFillPersonPlusFill
                  size={35}
                  fill="#fff"
                  className="bg-success rounded-full p-2"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-bold">14 Patients</p>
                  <p className="text-xs text-black/80">In the last 7 days</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-5">
              <div className="flex flex-row justify-center items-center gap-2">
                <BsPersonCheckFill
                  size={35}
                  fill="#fff"
                  className="bg-secondary rounded-full p-2"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-bold">10 Done</p>
                  <p className="text-xs text-black/80">In the last 7 days</p>
                </div>
              </div>

              <div className="flex flex-row justify-center items-center gap-2">
                <BsPersonBoundingBox
                  size={35}
                  fill="#fff"
                  className="bg-warning rounded-full p-2"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-bold">4 New</p>
                  <p className="text-xs text-black/80">Waiting for approval</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="row-span-2 col-span-2 flex flex-col gap-5 items-center p-5">
          <p className="text-sm font-semibold self-start">Todays Statistics</p>

          <Tooltip
            showArrow={true}
            placement="right-end"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Tip</div>
                <div className="text-tiny">Each 1% equals 1 patient</div>
              </div>
            }
          >
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
              label="Patients Waiting"
              value={30}
              // value={patient.progress.generalHealth}
              showValueLabel={true}
            />
          </Tooltip>
          <Tooltip
            showArrow={true}
            placement="right-end"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Tip</div>
                <div className="text-tiny">Each 10 % equals 1 patient</div>
              </div>
            }
          >
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
              label="Approved Patients"
              value={30}
              // value={patient.progress.waterBalance}
              showValueLabel={true}
            />
          </Tooltip>
          <Tooltip
            showArrow={true}
            placement="right-end"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Tip</div>
                <div className="text-tiny">Each 10 % equals 1 patient</div>
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
              value={17}
              // value={patient.progress.pendingAppointments}
              showValueLabel={true}
            />
          </Tooltip>
        </Card>

        <Card className="row-span-6  col-span-2 flex justify-center gap-5 items-center p-5">
          <PatientTabs />
        </Card>

        <Card className="row-span-3 col-span-4  flex flex-col justify-evenly items-center p-2">
          <MonthlyVisitors
            progressData={[10, 30, 20, 40, 50, 50, 70, 80, 45, 55, 33, 77]}
          />
        </Card>
      </div>
    </section>
  );
}
