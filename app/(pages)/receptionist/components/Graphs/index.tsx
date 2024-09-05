"use client";

import {
  Card,
  CardBody,
  Progress,
  Select,
  SelectItem,
  Tab,
  Tabs,
  TimeInput,
} from "@nextui-org/react";
import { PointTooltip, ResponsiveLine } from "@nivo/line";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import React from "react";

const healthData = [
  {
    id: "Patient A",
    data: [
      { x: "Jan", y: 40 },
      { x: "Feb", y: 70 },
      { x: "Mar", y: 90 },
      { x: "Apr", y: 60 },
      { x: "May", y: 50 },
      { x: "Jun", y: 80 },
      { x: "Jul", y: 95 },
      { x: "Aug", y: 45 },
      { x: "Sep", y: 85 },
      { x: "Oct", y: 70 },
      { x: "Nov", y: 88 },
      { x: "Dec", y: 75 },
    ],
  },
];

const years = [
  {
    label: "2020",
    year: 2020,
  },
  {
    label: "2021",
    year: 2021,
  },
  {
    label: "2022",
    year: 2022,
  },
  {
    label: "2023",
    year: 2023,
  },
  {
    label: "2024",
    year: 2024,
  },
];

type weeklyVisitorsProps = {
  progressData: number[];
};

// const MonthlyVisitors = ({ progressData }: weeklyVisitorsProps) => {
//   const updatedHealthData = healthData.map((patient) => ({
//     ...patient,
//     data: patient.data.map((item, index) => ({
//       ...item,
//       y: progressData[index] !== undefined ? progressData[index] : item.y,
//     })),
//   }));

//   return (
//     <div className="h-full w-full p-5">
//       <div className="flex flex-row justify-between items-center">
//         <p className="text-md font-semibold">Monthly visitors</p>
//       </div>
//       <ResponsiveLine
//         fill={[{ match: "*", id: "gradient" }]}
//         defs={[]}
//         enableCrosshair={false}
//         crosshairType="x"
//         role=""
//         sliceTooltip={({ slice }) => <></>}
//         data={updatedHealthData}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         xScale={{ type: "point" }}
//         yScale={{ type: "linear", min: 0, max: 100 }}
//         curve="catmullRom"
//         axisTop={null}
//         axisRight={null}
//         enableGridX={false}
//         enableGridY={false}
//         colors={["#0070f0"]}
//         lineWidth={2}
//         pointSize={8}
//         pointColor={{ theme: "grid.line.stroke" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         axisLeft={{
//           tickValues: [0, 25, 50, 75, 100],
//           legendOffset: -40,
//           legendPosition: "middle",
//         }}
//         useMesh={true}
//         debugSlices={false}
//         enableSlices={false}
//         // tooltip={({ point }) => (
//         //   <div>
//         //     <strong>X value:</strong> {point.data.xFormatted}
//         //     <br />
//         //     <strong>Y value:</strong> {point.data.yFormatted}
//         //   </div>
//         // )}
//         debugMesh={false}
//         isInteractive={true}
//         legends={[]}
//         areaBaselineValue={0}
//         areaBlendMode="normal"
//         areaOpacity={0.2}
//         enableArea={false}
//         pointLabel="y"
//         enablePointLabel={false}
//         enablePoints={true}
//         layers={[
//           "grid",
//           "markers",
//           "axes",
//           "areas",
//           "crosshair",
//           "lines",
//           "slices",
//           "points",
//           "mesh",
//           "legends",
//         ]}
//       />
//     </div>
//   );
// };

const todaysData = [
  {
    id: "Accepted",
    data: [{ x: "Accepted", y: 0 }],
  },
  {
    id: "Pending",
    data: [{ x: "Pending", y: 0 }],
  },
  {
    id: "Waiting",
    data: [{ x: "Waiting", y: 0 }],
  },
];

type WeeklyProgressProps = {
  progressData: number[];
};

const WeeklyProgress = ({ progressData }: WeeklyProgressProps) => {
  const updatedWeeklyData = todaysData.map((day, index) => ({
    ...day,
    data: [{ x: day.id, y: progressData[index] }],
  }));

  return (
    <ResponsiveRadialBar
      data={updatedWeeklyData}
      valueFormat=">-.2f"
      maxValue={50}
      startAngle={0}
      endAngle={360}
      colors={["#0070f0", "#18c964", "#f5a524"]}
      innerRadius={0.3}
      padding={0.7}
      cornerRadius={2}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      radialAxisStart={null}
      circularAxisOuter={null}
      // legends={[
      //   {
      //     anchor: "right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 80,
      //     translateY: 0,
      //     itemsSpacing: 6,
      //     itemDirection: "left-to-right",
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: "#999",
      //     symbolSize: 18,
      //     symbolShape: "square",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};

// --------

// Helper components
const StatItem = ({ icon, count, label, sublabel, color }: any) => (
  <div className="flex flex-row justify-center items-center gap-2">
    <div className={`${color} rounded-full p-2`}>
      {React.cloneElement(icon, { fill: "#fff" })}
    </div>
    <div className="flex flex-col">
      <p className="text-sm font-bold">
        {count} {label}
      </p>
      <p className="text-xs text-black/80">{sublabel}</p>
    </div>
  </div>
);

const ProgressBar = ({ label, value, color }: any) => (
  <Progress
    size="sm"
    radius="sm"
    classNames={{
      base: "max-w-md",
      track: "drop-shadow-md border border-default",
      indicator: color,
      label: "tracking-wider font-bold text-xs",
      value: "text-foreground/60 text-xs",
    }}
    label={label}
    value={value}
    showValueLabel={true}
  />
);

// ---

// components/receptionist/WaitingRoomStatus.tsx

interface WaitingRoomStatusProps {
  waitingPatients: number;
}

const WaitingRoomStatus: React.FC<WaitingRoomStatusProps> = ({
  waitingPatients,
}) => {
  const maxCapacity = 20; // Assuming a max capacity of 20 patients
  const occupancyPercentage = (waitingPatients / maxCapacity) * 100;

  return (
    <Card className="w-full p-4">
      <h3 className="text-lg font-semibold mb-2">Waiting Room Occupancy</h3>
      <Progress
        size="md"
        radius="sm"
        classNames={{
          base: "max-w-md",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-blue-500 to-purple-500",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        value={occupancyPercentage}
        showValueLabel={true}
        label={`${waitingPatients}/${maxCapacity} patients`}
      />
    </Card>
  );
};

//

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

interface PatientTabsProps {
  pendingAppointments: PendingPatients;
}

const PatientTabs: React.FC<PatientTabsProps> = ({ pendingAppointments }) => {
  return (
    <Tabs aria-label="Patient management">
      <Tab key="pending" title="Pending">
        <Card>
          <CardBody className="overflow-y-auto scrollbar">
            {pendingAppointments.patientDetails.map(
              (patient: any, index: any) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">
                    {patient.firstname} {patient.lastname}
                  </p>
                  <p className="text-sm text-gray-600">{patient.gender}</p>
                  <TimeInput
                    label="Time (controlled)"
                    value={patient.timing}
                    // onChange={setValue}
                    hideTimeZone
                  />
                </div>
              )
            )}
          </CardBody>
        </Card>
      </Tab>
      <Tab key="approved" title="Approved">
        <Card>
          <CardBody>
            <p>List of approved appointments</p>
            {/* Add approved appointments list here */}
          </CardBody>
        </Card>
      </Tab>
      <Tab key="cancelled" title="Cancelled">
        <Card>
          <CardBody>
            <p>List of cancelled appointments</p>
            {/* Add cancelled appointments list here */}
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
};

// components/receptionist/MonthlyVisitors.tsx

interface MonthlyVisitorsProps {
  progressData: number[];
}

const MonthlyVisitors: React.FC<MonthlyVisitorsProps> = ({ progressData }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = [
    {
      id: "Monthly Visitors",
      data: progressData.map((value, index) => ({
        x: months[index],
        y: value,
      })),
    },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Visitors",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export {
  WeeklyProgress,
  MonthlyVisitors,
  WaitingRoomStatus,
  PatientTabs,
  StatItem,
  ProgressBar,
};
