import {
  Card,
  Input,
  Badge,
  CardHeader,
  CardBody,
  Avatar,
  Button,
} from "@nextui-org/react";
import {
  BsFillPersonPlusFill,
  BsPersonBoundingBox,
  BsPersonCheckFill,
  BsPersonLinesFill,
  BsSearch,
  BsBell,
  BsClock,
  BsCalendarCheck,
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
    <section className="bg-[#f3f6fd] p-2 overflow-y-auto scrollbar">
      <div className="mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Quick Stats */}
            <Card>
              <CardBody>
                <Input
                  className="w-full mb-4"
                  placeholder="Search patients..."
                  startContent={<BsSearch className="text-default-400" />}
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatItem
                    icon={<BsPersonLinesFill size={24} />}
                    count={waitingPatients}
                    label="Waiting"
                    color="bg-primary"
                  />
                  <StatItem
                    icon={<BsPersonCheckFill size={24} />}
                    count={approvedAppointments}
                    label="Approved"
                    color="bg-success"
                  />
                  <StatItem
                    icon={<BsPersonBoundingBox size={24} />}
                    count={pendingAppointments}
                    label="Pending"
                    color="bg-warning"
                  />
                  <StatItem
                    icon={<BsFillPersonPlusFill size={24} />}
                    count={34}
                    label="New Patients"
                    color="bg-secondary"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader className="flex justify-between">
                <h2 className="text-lg font-semibold">Today&#39;s Schedule</h2>
                <Button size="sm" color="primary">
                  View All
                </Button>
              </CardHeader>
              <CardBody>
                {/* Sample schedule items - replace with actual data */}
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src={`https://i.pravatar.cc/150?u=a042581f4e29026024d${index}`}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-500">General Checkup</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BsClock className="text-gray-400" />
                      <span className="text-sm">09:00 AM</span>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Monthly Visitors Graph */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Monthly Visitors</h2>
              </CardHeader>
              <CardBody>
                <MonthlyVisitors
                  progressData={[
                    10, 30, 20, 40, 50, 50, 70, 80, 45, 55, 33, 77,
                  ]}
                />
              </CardBody>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Waiting Room Status */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Waiting Room Status</h2>
              </CardHeader>
              <CardBody>
                <WaitingRoomStatus waitingPatients={waitingPatients} />
              </CardBody>
            </Card>

            {/* Today's Progress */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Today&#39;s Progress</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <ProgressBar
                  label="Patients Seen"
                  value={approvedAppointments}
                  max={
                    approvedAppointments + pendingAppointments + waitingPatients
                  }
                  color="bg-success"
                />
                <ProgressBar
                  label="Waiting"
                  value={waitingPatients}
                  max={
                    approvedAppointments + pendingAppointments + waitingPatients
                  }
                  color="bg-warning"
                />
                <ProgressBar
                  label="Pending"
                  value={pendingAppointments}
                  max={
                    approvedAppointments + pendingAppointments + waitingPatients
                  }
                  color="bg-danger"
                />
              </CardBody>
            </Card>

            {/* Pending Appointments */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Pending Appointments</h2>
              </CardHeader>
              <CardBody>
                <PatientTabs pendingAppointments={pendingPatients} />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
