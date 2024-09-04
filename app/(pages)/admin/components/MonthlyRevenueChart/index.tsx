"use client";

import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

const MonthlyRevenueChart = ({ data }: any) => {
  return (
    <Card className="h-[400px]">
      <CardHeader className="border-b border-gray-200 p-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Monthly Revenue
        </h3>
      </CardHeader>
      <CardBody className="p-6 overflow-hidden">
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 10, bottom: 50, left: 55 }}
          curve="catmullRom"
          colors={["#0070f0"]}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
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
            legend: "Revenue (₹)",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </CardBody>
    </Card>
  );
};

export default MonthlyRevenueChart;
