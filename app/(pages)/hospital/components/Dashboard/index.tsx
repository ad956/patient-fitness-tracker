"use client";

import { Card } from "@nextui-org/react";
import { ResponsiveLine } from "@nivo/line";
import React from "react";

export default function Dashboard() {
  const lineGraphData1 = [
    {
      id: "Patients",
      color: "hsl(236, 70%, 50%)",
      data: [
        { x: "Monday", y: 30 },
        { x: "Tuesday", y: 40 },
        { x: "Wednesday", y: 50 },
        { x: "Thursday", y: 60 },
        { x: "Friday", y: 70 },
      ],
    },
  ];

  const lineGraphData2 = [
    {
      id: "Revenue",
      color: "hsl(142, 70%, 50%)",
      data: [
        { x: "Monday", y: 200 },
        { x: "Tuesday", y: 300 },
        { x: "Wednesday", y: 400 },
        { x: "Thursday", y: 500 },
        { x: "Friday", y: 600 },
      ],
    },
  ];

  return (
    <>
      {/* First Graph */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4">Patient Statistics</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveLine
            data={lineGraphData1}
            margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              stacked: false,
              min: "auto",
              max: "auto",
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Days",
              legendOffset: 36,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Patients",
              legendOffset: -40,
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
          />
        </div>
      </Card>

      {/* Second Graph */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4">Revenue Growth</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveLine
            data={lineGraphData2}
            margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              stacked: false,
              min: "auto",
              max: "auto",
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Days",
              legendOffset: 36,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Revenue ($)",
              legendOffset: -40,
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
          />
        </div>
      </Card>
    </>
  );
}
