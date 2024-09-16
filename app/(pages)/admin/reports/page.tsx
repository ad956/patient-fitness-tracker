"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Select,
  SelectItem,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";

interface Hospital {
  id: number;
  name: string;
  totalUsers: number;
  doctors: number;
  receptionists: number;
  nurses: number;
  patients: number;
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Central Hospital",
    totalUsers: 500,
    doctors: 50,
    receptionists: 20,
    nurses: 150,
    patients: 280,
  },
  {
    id: 2,
    name: "City General Hospital",
    totalUsers: 750,
    doctors: 80,
    receptionists: 30,
    nurses: 220,
    patients: 420,
  },
  {
    id: 3,
    name: "Community Health Center",
    totalUsers: 300,
    doctors: 30,
    receptionists: 15,
    nurses: 90,
    patients: 165,
  },
];

const Reports: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const hospitalId: number = parseInt(e.target.value, 10);
    const hospital: Hospital | undefined = hospitals.find(
      (h) => h.id === hospitalId
    );
    setSelectedHospital(hospital || null);
  };

  const getPieChartData = (hospital: Hospital) => [
    { id: "doctors", label: "Doctors", value: hospital.doctors },
    { id: "nurses", label: "Nurses", value: hospital.nurses },
    {
      id: "receptionists",
      label: "Receptionists",
      value: hospital.receptionists,
    },
    { id: "patients", label: "Patients", value: hospital.patients },
  ];

  const getLineChartData = () => [
    {
      id: "doctors",
      data: hospitals.map((h) => ({ x: h.name, y: h.doctors })),
    },
    {
      id: "nurses",
      data: hospitals.map((h) => ({ x: h.name, y: h.nurses })),
    },
    {
      id: "receptionists",
      data: hospitals.map((h) => ({ x: h.name, y: h.receptionists })),
    },
    {
      id: "patients",
      data: hospitals.map((h) => ({ x: h.name, y: h.patients })),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Hospital Reports Dashboard</h1>

      <Select
        label="Select a hospital"
        placeholder="Choose a hospital"
        className="max-w-xs mb-6"
        onChange={handleSelectionChange}
      >
        {hospitals.map((hospital: Hospital) => (
          <SelectItem key={hospital.id} value={hospital.id.toString()}>
            {hospital.name}
          </SelectItem>
        ))}
      </Select>

      {selectedHospital && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            {selectedHospital.name} Report
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>Staff and Patient Distribution</CardHeader>
              <CardBody className="h-80">
                <ResponsivePie
                  data={getPieChartData(selectedHospital)}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                />
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Hospital Statistics</CardHeader>
              <CardBody>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Statistic</th>
                      <th className="text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(selectedHospital).map(([key, value]) => {
                      if (key !== "id" && key !== "name") {
                        return (
                          <tr key={key}>
                            <td className="py-2">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </td>
                            <td className="py-2">{value}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </>
      )}

      <h2 className="text-xl font-semibold mb-4">All Hospitals Overview</h2>
      <Card className="mb-6">
        <CardHeader>Hospital Comparison</CardHeader>
        <CardBody className="h-96">
          <ResponsiveLine
            data={getLineChartData()}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Hospital",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Count",
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
        </CardBody>
      </Card>

      <Table aria-label="Hospitals overview table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>TOTAL USERS</TableColumn>
          <TableColumn>DOCTORS</TableColumn>
          <TableColumn>RECEPTIONISTS</TableColumn>
          <TableColumn>NURSES</TableColumn>
          <TableColumn>PATIENTS</TableColumn>
        </TableHeader>
        <TableBody>
          {hospitals.map((hospital: Hospital) => (
            <TableRow key={hospital.id}>
              <TableCell>{hospital.name}</TableCell>
              <TableCell>{hospital.totalUsers}</TableCell>
              <TableCell>{hospital.doctors}</TableCell>
              <TableCell>{hospital.receptionists}</TableCell>
              <TableCell>{hospital.nurses}</TableCell>
              <TableCell>{hospital.patients}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Reports;
