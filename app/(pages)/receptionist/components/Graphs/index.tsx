"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { PointTooltip, ResponsiveLine } from "@nivo/line";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

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

const MonthlyVisitors = ({ progressData }: weeklyVisitorsProps) => {
  const updatedHealthData = healthData.map((patient) => ({
    ...patient,
    data: patient.data.map((item, index) => ({
      ...item,
      y: progressData[index] !== undefined ? progressData[index] : item.y,
    })),
  }));

  return (
    <div className="h-full w-full p-5">
      <div className="flex flex-row justify-between items-center">
        <p className="text-md font-semibold">Monthly visitors</p>

        <Select
          aria-label="Select Year"
          color="secondary"
          labelPlacement="outside-left"
          className="w-1/6"
          defaultSelectedKeys={["2024"]}
        >
          {years.map((year) => (
            <SelectItem key={year.year} value={year.year}>
              {year.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <ResponsiveLine
        fill={[{ match: "*", id: "gradient" }]}
        defs={[]}
        enableCrosshair={false}
        crosshairType="x"
        role=""
        sliceTooltip={({ slice }) => <></>}
        data={updatedHealthData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: 100 }}
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={false}
        colors={["#0070f0"]}
        lineWidth={2}
        pointSize={8}
        pointColor={{ theme: "grid.line.stroke" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        axisLeft={{
          tickValues: [0, 25, 50, 75, 100],
          legendOffset: -40,
          legendPosition: "middle",
        }}
        useMesh={true}
        debugSlices={false}
        enableSlices={false}
        // tooltip={({ point }) => (
        //   <div>
        //     <strong>X value:</strong> {point.data.xFormatted}
        //     <br />
        //     <strong>Y value:</strong> {point.data.yFormatted}
        //   </div>
        // )}
        debugMesh={false}
        isInteractive={true}
        legends={[]}
        areaBaselineValue={0}
        areaBlendMode="normal"
        areaOpacity={0.2}
        enableArea={false}
        pointLabel="y"
        enablePointLabel={false}
        enablePoints={true}
        layers={[
          "grid",
          "markers",
          "axes",
          "areas",
          "crosshair",
          "lines",
          "slices",
          "points",
          "mesh",
          "legends",
        ]}
      />
    </div>
  );
};

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

export { WeeklyProgress, MonthlyVisitors };
