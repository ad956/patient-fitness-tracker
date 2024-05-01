import { Card, Progress } from "@nextui-org/react";
import React from "react";
import {
  BsFillPersonPlusFill,
  BsPersonBoundingBox,
  BsPersonCheckFill,
  BsPersonLinesFill,
} from "react-icons/bs";
import { PatientDetails, Receptionist } from "@/types";
import { getReceptionistData } from "@/lib/receptionist/getReceptionistData";
import { MonthlyVisitors } from "./components/Graphs";
import PatientTabs from "./components/PatientTabs";
import { getPendingAppointments } from "@/lib/receptionist/getPendingAppointments";

export default async function ReceptionistPage() {
  const { receptionist }: { receptionist: Receptionist } =
    await getReceptionistData();

  if (!receptionist) throw new Error("fetching receptionist data");

  const pendingPatients = await getPendingAppointments();

  if (!pendingPatients) {
    throw new Error("fetching patient appointments");
  }

  const pendingAppointments = pendingPatients.patientDetails.length;
  const approvedAppointments = receptionist.dailyCount.approved;
  const waitingPatients = receptionist.dailyCount.waiting;

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
                  <p className="text-sm font-bold">
                    {pendingPatients.patientDetails.length} New
                  </p>
                  <p className="text-xs text-black/80">Waiting for approval</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="row-span-2 col-span-2 flex flex-col gap-5 items-center p-5">
          <p className="text-sm font-semibold self-start">Todays Statistics</p>

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
            formatOptions={{ style: "decimal" }}
            value={waitingPatients}
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
            label="Approved Patients"
            formatOptions={{ style: "decimal" }}
            value={approvedAppointments}
            showValueLabel={true}
          />

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
            formatOptions={{ style: "decimal" }}
            value={pendingAppointments}
            showValueLabel={true}
          />
        </Card>

        <Card className="row-span-6  col-span-2 flex justify-center gap-5 items-center p-5">
          <PatientTabs pendingAppointments={pendingPatients} />
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
