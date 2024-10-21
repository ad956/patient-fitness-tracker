import {
  Card,
  Input,
  Badge,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
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
  BsThreeDotsVertical,
  BsFilter,
  BsExclamationCircle,
  BsCalendarWeek,
  BsClockHistory,
  BsPrinter,
  BsFiles,
} from "react-icons/bs";
import { getReceptionistData, getPendingAppointments } from "@lib/receptionist";
import {
  MonthlyVisitors,
  PatientTabs,
  ProgressBar,
  StatItem,
  WaitingRoomStatus,
} from "./components/Graphs";

export default async function ReceptionistPage() {
  const receptionist = await getReceptionistData();
  const pendingPatients = await getPendingAppointments();

  const pendingAppointments = pendingPatients.patientDetails.length;
  const approvedAppointments = receptionist.dailyCount.approved;
  const waitingPatients = receptionist.dailyCount.waiting;

  return (
    <div className="min-h-screen bg-[#f3f6fd]">
      <section className="p-6 overflow-y-auto scrollbar">
        <div className="mx-auto">
          {/* Quick Actions */}
          <div className="mb-6 flex gap-4 flex-wrap">
            <Button
              color="primary"
              variant="flat"
              startContent={<BsCalendarWeek />}
            >
              Schedule Appointment
            </Button>
            <Button
              color="secondary"
              variant="flat"
              startContent={<BsClockHistory />}
            >
              View History
            </Button>
            <Button color="success" variant="flat" startContent={<BsPrinter />}>
              Print Reports
            </Button>
            <Button color="warning" variant="flat" startContent={<BsFiles />}>
              Export Data
            </Button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Quick Stats */}
              <Card>
                <CardBody>
                  <div className="flex gap-4 mb-4">
                    <Input
                      className="flex-1"
                      placeholder="Search patients..."
                      startContent={<BsSearch className="text-default-400" />}
                    />
                    <Button
                      isIconOnly
                      variant="flat"
                      startContent={<BsFilter size={20} />}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatItem
                      icon={<BsPersonLinesFill size={24} />}
                      count={waitingPatients}
                      label="Waiting"
                      color="bg-primary"
                      trend="+5%"
                    />
                    <StatItem
                      icon={<BsPersonCheckFill size={24} />}
                      count={approvedAppointments}
                      label="Approved"
                      color="bg-success"
                      trend="+12%"
                    />
                    <StatItem
                      icon={<BsPersonBoundingBox size={24} />}
                      count={pendingAppointments}
                      label="Pending"
                      color="bg-warning"
                      trend="-2%"
                    />
                    <StatItem
                      icon={<BsFillPersonPlusFill size={24} />}
                      count={34}
                      label="New Patients"
                      color="bg-secondary"
                      trend="+8%"
                    />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Today&apos;s Schedule
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="flat">
                      Filter
                    </Button>
                    <Button size="sm" color="primary">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar
                          src={`https://i.pravatar.cc/150?u=a042581f4e29026024d${index}`}
                          size="sm"
                        />
                        <div>
                          <p className="font-medium">John Doe</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500">
                              General Checkup
                            </p>
                            {index === 0 && (
                              <Badge color="danger" variant="flat" size="sm">
                                Urgent
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <BsClock className="text-gray-400" />
                          <span className="text-sm">09:00 AM</span>
                        </div>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly variant="light" size="sm">
                              <BsThreeDotsVertical />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem>Edit Appointment</DropdownItem>
                            <DropdownItem>Cancel Appointment</DropdownItem>
                            <DropdownItem>Send Reminder</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>

              {/* Analytics Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold">Room Utilization</h2>
                  </CardHeader>
                  <CardBody>
                    {/* <RoomUtilization /> */}
                    Room Utilisatioin
                  </CardBody>
                </Card>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Doctor Availability */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Doctor Availability</h2>
                </CardHeader>
                <CardBody>
                  {/* <DoctorAvailability /> */}
                  DoctorAvailability
                </CardBody>
              </Card>

              {/* Waiting Room Status */}
              <Card>
                <CardHeader className="flex justify-between">
                  <h2 className="text-lg font-semibold">Waiting Room Status</h2>
                  <Tooltip content="Current capacity: 80%">
                    <Button isIconOnly variant="light" size="sm">
                      <BsExclamationCircle />
                    </Button>
                  </Tooltip>
                </CardHeader>
                <CardBody>
                  <WaitingRoomStatus
                    waitingPatients={waitingPatients}
                    // maxCapacity={50}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">
                    Today&apos;s Progress
                  </h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <ProgressBar
                    label="Patients Seen"
                    value={approvedAppointments}
                    max={
                      approvedAppointments +
                      pendingAppointments +
                      waitingPatients
                    }
                    color="bg-success"
                  />
                  <ProgressBar
                    label="Waiting"
                    value={waitingPatients}
                    max={
                      approvedAppointments +
                      pendingAppointments +
                      waitingPatients
                    }
                    color="bg-warning"
                  />
                  <ProgressBar
                    label="Pending"
                    value={pendingAppointments}
                    max={
                      approvedAppointments +
                      pendingAppointments +
                      waitingPatients
                    }
                    color="bg-danger"
                  />
                  <ProgressBar
                    label="Cancelled"
                    value={12}
                    max={
                      approvedAppointments +
                      pendingAppointments +
                      waitingPatients
                    }
                    color="bg-gray-400"
                  />
                </CardBody>
              </Card>

              {/* Pending Appointments */}
              <Card>
                <CardHeader className="flex justify-between">
                  <h2 className="text-lg font-semibold">
                    Pending Appointments
                  </h2>
                  <Badge color="danger">{pendingAppointments}</Badge>
                </CardHeader>
                <CardBody>
                  <PatientTabs pendingAppointments={pendingPatients} />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
