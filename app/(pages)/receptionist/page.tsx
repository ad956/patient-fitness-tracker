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
import { WeeklyProgress, HealthConditions } from "../patient/components/Graphs";
import CarouselService from "../patient/components/ServiceCarousel";
import { FcCloseUpMode } from "react-icons/fc";

export default function ReceptionistPage() {
  return (
    <section className="bg-[#f3f6fd] overflow-hidden p-2">
      <div className="grid grid-cols-5 grid-rows-5 h-full gap-3">
        <Card className="row-span-2 col-span-2 flex flex-col justify-center items-center p-5">
          <p className="text-sm font-medium self-start">Statistics</p>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <FcCloseUpMode />
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
