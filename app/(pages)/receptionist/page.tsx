import { Card, Input, Badge, CardHeader, CardBody } from "@nextui-org/react";
import {
  BsFillPersonPlusFill,
  BsPersonBoundingBox,
  BsPersonCheckFill,
  BsPersonLinesFill,
  BsSearch,
  BsBell,
} from "react-icons/bs";
import { Receptionist } from "@pft-types/index";
import { getReceptionistData, getPendingAppointments } from "@lib/receptionist";
import {
  MonthlyVisitors,
  PatientTabs,
  ProgressBar,
  StatItem,
  WaitingRoomStatus,
} from "./components/Graphs";

export default async function ReceptionistPage() {
  interface PatientDetail {
    id: string;
    name: string;
    appointmentTime: string;
    reason: string;
    contactNumber: string;
    email?: string;
  }

  interface PendingPatients {
    patientDetails: PatientDetail[];
    totalCount: number;
  }

  const receptionist: Receptionist = await getReceptionistData();
  const pendingPatients: PendingPatients = await getPendingAppointments();

  const pendingAppointments = pendingPatients.patientDetails.length;
  const approvedAppointments = receptionist.dailyCount.approved;
  const waitingPatients = receptionist.dailyCount.waiting;

  return (
    <section className="bg-[#f3f6fd] min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Quick Patient Search */}
        <Card className="lg:col-span-4 p-4">
          <Input
            className="w-full"
            placeholder="Quick patient search..."
            startContent={<BsSearch className="text-default-400" />}
          />
        </Card>

        {/* Notifications */}
        <Card className="lg:col-span-2 p-4 flex justify-between items-center">
          <BsBell size={20} className="text-default-400" />
          <Badge content={3} color="danger">
            <span className="text-sm">New notifications</span>
          </Badge>
        </Card>

        {/* Patient Statistics */}
        <Card className="lg:col-span-3 lg:row-span-2">
          <CardHeader>
            <p className="text-sm font-semibold">Patient Statistics</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatItem
                icon={<BsPersonLinesFill size={35} />}
                count={34}
                label="Patients"
                sublabel="In the last 30 days"
                color="bg-gradient-to-r from-yellow-500 to-pink-500"
              />
              <StatItem
                icon={<BsFillPersonPlusFill size={35} />}
                count={14}
                label="Patients"
                sublabel="In the last 7 days"
                color="bg-success"
              />
              <StatItem
                icon={<BsPersonCheckFill size={35} />}
                count={10}
                label="Done"
                sublabel="In the last 7 days"
                color="bg-secondary"
              />
              <StatItem
                icon={<BsPersonBoundingBox size={35} />}
                count={pendingAppointments}
                label="New"
                sublabel="Waiting for approval"
                color="bg-warning"
              />
            </div>
          </CardBody>
        </Card>

        {/* Today's Statistics */}
        <Card className="lg:col-span-3 lg:row-span-2">
          <CardHeader>
            <p className="text-sm font-semibold">Today&apos;s Statistics</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <ProgressBar
              label="Patients Waiting"
              value={waitingPatients}
              color="bg-gradient-to-r from-yellow-500 to-pink-500"
            />
            <ProgressBar
              label="Approved Patients"
              value={approvedAppointments}
              color="bg-secondary"
            />
            <ProgressBar
              label="Pending Appointments"
              value={pendingAppointments}
              color="bg-warning"
            />
          </CardBody>
        </Card>

        {/* Waiting Room Status */}
        <Card className="lg:col-span-2 lg:row-span-2">
          <CardHeader>
            <p className="text-sm font-semibold">Waiting Room Status</p>
          </CardHeader>
          <CardBody>
            <WaitingRoomStatus waitingPatients={waitingPatients} />
          </CardBody>
        </Card>

        {/* Patient Tabs (Pending Appointments) */}
        <Card className="lg:col-span-2 lg:row-span-4">
          <CardBody>
            <PatientTabs pendingAppointments={pendingPatients} />
          </CardBody>
        </Card>

        {/* Monthly Visitors Graph */}
        <Card className="lg:col-span-4 lg:row-span-2">
          <CardHeader>
            <p className="text-sm font-semibold">Monthly Visitors</p>
          </CardHeader>
          <CardBody>
            <MonthlyVisitors
              progressData={[10, 30, 20, 40, 50, 50, 70, 80, 45, 55, 33, 77]}
            />
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
