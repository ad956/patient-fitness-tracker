"use client";

import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

const healthData = [
  {
    id: "patient",
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

type HealthProgressProps = {
  progressData: number[];
};

const HealthConditions = ({ progressData }: HealthProgressProps) => {
  const updatedHealthData = healthData.map((patient) => ({
    ...patient,
    data: patient.data.map((item, index) => ({
      ...item,
      y: progressData[index] !== undefined ? progressData[index] : null,
    })),
  }));

  const updatedDataWithNull = updatedHealthData.map((patient) => ({
    ...patient,
    data: patient.data.map((item) => ({
      ...item,
      y: item.y === 0 ? "Data not available for this month" : item.y,
    })),
  }));

  return (
    <div className="h-full w-full p-5">
      <div className="flex flex-row justify-between items-center">
        <p className="text-md font-semibold">Your Health Conditions</p>
      </div>
      <ResponsiveLine
        animate={false}
        fill={[{ match: "*", id: "gradient" }]}
        defs={[]}
        enableCrosshair={false}
        crosshairType="x"
        role=""
        sliceTooltip={({ slice }) => <></>}
        data={updatedDataWithNull}
        margin={{ top: 50, right: 10, bottom: 50, left: 30 }}
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

const WeeklyData = [
  {
    id: "Monday",
    data: [{ x: "Monday", y: 0 }],
  },
  {
    id: "Tuesday",
    data: [{ x: "Tuesday", y: 0 }],
  },
  {
    id: "Wednesday",
    data: [{ x: "Wednesday", y: 0 }],
  },
  {
    id: "Thursday",
    data: [{ x: "Thursday", y: 0 }],
  },
  {
    id: "Friday",
    data: [{ x: "Friday", y: 0 }],
  },
  {
    id: "Saturday",
    data: [{ x: "Saturday", y: 0 }],
  },
  {
    id: "Sunday",
    data: [{ x: "Sunday", y: 0 }],
  },
];

type WeeklyProgressProps = {
  progressData: number[];
};

const WeeklyProgress = ({ progressData }: WeeklyProgressProps) => {
  const updatedWeeklyData = WeeklyData.map((day, index) => ({
    ...day,
    data: [{ x: day.id, y: progressData[index] }],
  }));

  return (
    <ResponsiveRadialBar
      data={updatedWeeklyData}
      valueFormat=">-.2f"
      // startAngle={-360}
      // endAngle={-360}
      colors={[
        "#fd893c",
        "#f5547e",
        "#ffa046",
        "#fdde50",
        "#0babcf",
        "#4e5bdb",
        "#9b49ea",
      ]}
      innerRadius={0}
      padding={0.4}
      cornerRadius={2}
      margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
      radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
      circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 80,
          translateY: 0,
          itemsSpacing: 6,
          itemDirection: "left-to-right",
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          symbolSize: 18,
          symbolShape: "square",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export { WeeklyProgress, HealthConditions };
